"use strict";const{contextBridge:t,ipcRenderer:n}=require("electron"),s=()=>{n.send("window-min")},c=()=>{n.send("window-max")},r=()=>{n.send("window-close")};t.exposeInMainWorld("myApi",{minimizeWindow:s,maximizeWindow:c,closeWindow:r});window.addEventListener("DOMContentLoaded",()=>{const i=(e,d)=>{const o=document.getElementById(e);o&&(o.innerText=d)};for(const e of["chrome","node","electron"])i(`${e}-version`,process.versions[e])});
