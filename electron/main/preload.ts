const { contextBridge, ipcRenderer } = require('electron')

const setItem = (name: string, item: string) => {
  ipcRenderer.send('set-item', name, item)
}

const getItem = async (name: string) => {
  return await ipcRenderer.invoke('get-item', name)
}

const delItem = (name: string) => {
  ipcRenderer.send('del-item', name)
}

// 打开新窗口
const createNewWindow = (optionObj: object, configObj: object) => {
  ipcRenderer.send('window-create', optionObj, configObj)
}

// 获取屏幕尺寸
const getScreenSize = () => {
  return ipcRenderer.invoke('get-screen-size')
}
// 固定窗口
const setWindowOnTop = (state) => {
  ipcRenderer.send('window-on-top', state)
}

// 最小化
const minimizeWindow = () => {
  ipcRenderer.send('window-min')
}

// 最大化
const maximizeWindow = (state: boolean, windowSize = {}) => {
  ipcRenderer.send('window-max', state, windowSize)
}

// 关闭窗口
const closeWindow = () => {
  ipcRenderer.send('window-close')
}

// 隐藏到托盘
const hideWindow = () => {
  ipcRenderer.send('window-hide')
}

/********************************************************************************
 * @brief: 获取图片路径
 * @return {*}
 ********************************************************************************/
const getImgPath = async () => {
  return await ipcRenderer.invoke('img-path')
}

//获取文件路径
const getFilePath = async () => {
  return await ipcRenderer.invoke('select-file')
}

//获取文件夹路径
const getDirPath = async () => {
  return await ipcRenderer.invoke('select-dir')
}


contextBridge.exposeInMainWorld('myApi', {
  setItem,
  getItem,
  delItem,
  minimizeWindow,
  maximizeWindow,
  setWindowOnTop,
  closeWindow,
  hideWindow,
  createNewWindow,
  getScreenSize,
  getImgPath,
  getFilePath,
  getDirPath
})
// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
