const {
  app,
  protocol,
  BrowserWindow,
  screen,
  ipcMain,
  Menu,
  Tray,
} = require('electron')
// 需在当前文件内开头引入 Node.js 的 'path' 模块
const path = require('path')

import { windowControlListener } from '../controller/windowControl'
import CreateWindow from '../controller/createWindow'
import { setItem, getItem, delItem } from '../controller/storage'

// 窗口监听
windowControlListener()

ipcMain.on('set-item', (event, name: string, item: string) => {
  setItem(name, item)
})

ipcMain.on('del-item', (event, name: string) => {
  delItem(name)
})

ipcMain.handle('get-item', async (event, name: string) => {
  return await getItem(name)
})

// 创建其他窗口
ipcMain.on('window-create', (event, optionObj: object, configObj: object) => {
  let cw = new CreateWindow()
  cw.createWindow(optionObj, configObj)
})

// pinia
ipcMain.on('store-set', (event, objData) => {
  // 遍历窗口发送
  for (const cur of BrowserWindow.getAllWindows()) {
    if (cur != BrowserWindow.fromWebContents(event.sender)) {
      cur.webContents.send('store-get', objData)
    }
  }
})

// 创建主窗口
const createMainWindow = async () => {
  let mainW = new CreateWindow()
  mainW.createWindow(
    {
      route: '/home',
      isMainWin: true,
    },
    {
      width: 600,
      height: 500,
      show: false
    }
  )
  return mainW
}

app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

let tray = null

app.whenReady().then(() => {
  // 创建窗口
  const win = createMainWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
  // 创建托盘图标并设置上下文菜单
  // let iconPath = 'icon.png'
  let iconPath = path.join(__dirname, '../../dist/icon.png')
  console.info(iconPath)
  tray = new Tray(iconPath) // 这里替换为你的托盘图标路径
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示窗口',
      click: () => {
        CreateWindow.getMainWindow().show()
      }
     }, // 显示窗口
    {
      label: '退出',
      click: () => {
        tray.destroy()
        app.quit()
      },
    }, // 退出应用
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Electron')
})

// 关闭所有窗口
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
