<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { XBox } from '@/utils/xBox/xBox.js'
// const { ipcRenderer } = require('electron')
// import os from 'os'

const win = window as any
const curOnTop = ref<boolean>(false)
const curMaxState = ref<boolean>(false)
let restoreSize = {}
// 置顶图标角度
const rotate = ref<string>('rotate(0)')

// let isMac = ref<boolean>(os.platform() == 'darwin')

/********************************************************************************
 * @brief: 关闭窗口
 * @return {*}
 ********************************************************************************/
const closeWindow = () => {
  win.myApi.hideWindow()
  // ipcRenderer.send('window-close')
}
/********************************************************************************
 * @brief: 最大化或者恢复窗口
 * @return {*}
 ********************************************************************************/
const maximizeWindow = () => {
  if (!curMaxState.value) {
    restoreSize = {
      width: win.innerWidth,
      height: win.innerHeight,
    }
    win.myApi.maximizeWindow(curMaxState.value)
  } else {
    win.myApi.maximizeWindow(curMaxState.value, restoreSize)
  }
  curMaxState.value = !curMaxState.value
  // ipcRenderer.send('window-max')
}
/********************************************************************************
 * @brief: 最小化窗口
 * @return {*}
 ********************************************************************************/
const minimizeWindow = () => {
  win.myApi.minimizeWindow()
  // ipcRenderer.send('window-min')
}
/********************************************************************************
 * @brief: 设置窗口置顶
 * @return {*}
 ********************************************************************************/
const setWindowOnTop = () => {
  curOnTop.value = !curOnTop.value
  if (curOnTop.value) {
    XBox.popMes('窗口已置顶')
    rotate.value = 'rotate(-45deg)'
  } else {
    XBox.popMes('窗口已取消置顶')
    rotate.value = 'rotate(0)'
  }
  win.myApi.setWindowOnTop(curOnTop.value)
}
</script>
<template>
  <div class="topBar">
    <div class="winTool">
      <div
        @click="setWindowOnTop"
        id="on-top-box"
        :style="{
          transform: rotate,
        }"
      >
        <svg
          t="1730294974518"
          class="icon1"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1466"
          width="24"
          height="24"
        >
          <path
            d="M519.065252 0.049275A511.951045 511.951045 0 0 0 0.07488 504.960993 497.872391 497.872391 0 0 0 9.034023 607.991141 482.51386 482.51386 0 0 0 37.83127 703.981962a411.480652 411.480652 0 0 0 20.478041 45.435655A534.988842 534.988842 0 0 0 112.70411 831.969723a518.990372 518.990372 0 0 0 149.105742 127.987761c14.078654 8.319204 29.437185 15.358531 44.155777 22.397858a494.032758 494.032758 0 0 0 95.990821 30.717063 498.51233 498.51233 0 0 0 103.030148 10.87896 511.951045 511.951045 0 1 0 14.078654-1023.90209z m235.49748 453.716614L601.617358 602.231692a134.387149 134.387149 0 0 1-23.677736 127.987761l-1.919817 1.919816a26.237491 26.237491 0 0 1-37.756389 0L432.033574 627.189305l-127.987761 123.50819-37.75639 7.039326a6.399388 6.399388 0 0 1-7.679265-5.11951l8.319204-37.75639 127.987761-123.508189-103.030148-108.149658a27.517369 27.517369 0 0 1 0-38.396329 8.319204 8.319204 0 0 1 4.479572-3.839632 134.387149 134.387149 0 0 1 127.987761-20.478042L576.019805 271.383329a27.517369 27.517369 0 0 1 38.396329 0l140.786537 144.62617a26.87743 26.87743 0 0 1-0.639939 37.75639z"
            fill="#8a8a8a"
            p-id="1467"
            class="sweezy-custom-cursor-hover selected"
            style='null;cursor: url("data:image/png;base64,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") 3 1, pointer !important;'
            data-spm-anchor-id="a313x.search_index.0.i2.735d3a81WOGCjo"
          ></path>
        </svg>
      </div>
      <div @click="minimizeWindow">
        <div class="window-tools tool1"></div>
      </div>
      <div @click="maximizeWindow">
        <div class="window-tools tool3"></div>
      </div>
      <div @click="closeWindow">
        <div class="window-tools tool4"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
#on-top-box {
  svg {
    @include global.flex_center;
  }
}
.topBar {
  height: 27px;
  line-height: 25px;
  width: 125px;
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 9999;
  -webkit-app-region: no-drag;
}
.winTool {
  height: 100%;
  width: 100%;
  display: flex;
  -webkit-app-region: no-drag;
  justify-content: space-around;
  align-items: center;
  z-index: 9999;
}
.winTool > div {
  text-align: center;
  color: #999;
  cursor: pointer;
  line-height: 25px;
  .window-tools {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    cursor: pointer;
  }
  .tool1 {
    background: rgb(169, 248, 182);
  }
  .tool2,
  .tool3 {
    background: rgb(245, 229, 190);
  }
  .tool4 {
    background: rgb(250, 206, 203);
  }
}
</style>
