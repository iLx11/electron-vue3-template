"use strict";const{ipcMain:i,BrowserWindow:r}=require("electron"),w=()=>{i.on("window-min",e=>{const o=e.sender;r.fromWebContents(o).minimize()}),i.on("window-max",e=>{const o=e.sender,t=r.fromWebContents(o);t.isMaximized()?t.unmaximize():t.maximize()}),i.on("window-close",e=>{const o=e.sender;r.fromWebContents(o).close()})},{app:n,protocol:c,BrowserWindow:d,globalShortcut:l}=require("electron"),s=require("path");w();n.commandLine.appendSwitch("--ignore-certificate-errors","true");c.registerSchemesAsPrivileged([{scheme:"app",privileges:{secure:!0,standard:!0}}]);const a=()=>{const e=new d({center:!0,frame:!1,show:!0,width:999,height:773,transparent:!0,maxWidth:999,maxHeight:773,minWidth:688,minHeight:560,webPreferences:{nodeIntegration:!0,preload:s.join(__dirname,"../preload/preload.js")}});e.setMenu(null),n.isPackaged?(e.loadURL(`file://${s.join(__dirname,"../../dist/index.html")}`),e.webContents.openDevTools()):(e.loadURL("http://localhost:5173/"),e.webContents.openDevTools()),l.register("CommandOrControl+Shift+i",function(){e.webContents.openDevTools()})};n.whenReady().then(()=>{a(),n.on("activate",()=>{d.getAllWindows().length===0&&a()})});n.on("window-all-closed",()=>{process.platform!=="darwin"&&n.quit()});
