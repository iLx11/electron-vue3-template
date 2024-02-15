import { BrowserWindow } from 'electron'

export default interface IWindowOption {
  width: number;
  height: number;
  backgroundColor: string;
  autoHideMenuBar: boolean;
  resizable: boolean;
  minimizable: boolean;
  maximizable: boolean;
  frame: boolean;
  show: boolean;
  parent?: BrowserWindow;
  minWidth: number;
  minHeight: number;
  modal: boolean;
  webPreferences: {
    contextIsolation: boolean; //上下文隔离
    nodeIntegration: boolean; //启用 Node 集成（是否完整的支持 node）
    webSecurity: boolean;
    preload: string;
  };
}