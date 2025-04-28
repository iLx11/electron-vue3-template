<script setup lang="ts">
import { onMounted } from 'vue'
import WindowTitle from '../components/tools/WindowTitle.vue'
import { XBox } from '@/utils/xBox/xBox.js'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const win = window as any
onMounted(() => {
  XBox.popMes('请调整坐姿', {
    callback: () => {
      win.myApi.closeWindow()
    },
  })
})

const windowListener = () => {
  // 主页面监听
  win.myApi.storeChangeListen((objData: object) => {
    // console.info('keyConfigPage listening')
    const keys = Object.keys(objData)
    for (let key of keys) {
      // 设置对应 store 的
      configStore[
        `set${key.replace(key.charAt(0), key.charAt(0).toUpperCase())}`
      ](objData[key])
    }
    // console.info(configStore.curScreen)
  })
  // 获取 配置的索引
  win.myApi.setConfigStore({
    get: 'xxxxxx',
  })
}
</script>

<template>
  <div class="container"></div>
</template>

<style lang="scss" scoped>
#cover {
  width: 98%;
  height: 98%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(51, 51, 51, 0.2);
  border-radius: 15px;
  z-index: 998;
}
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // border: 0.1px solid rgba(173, 171, 171, 0.4);
  // border-radius: 16px;
  // overflow: hidden;

  // box-sizing: border-box;
  // padding: 10px;
  // z-index: 2;
  // // box-shadow: 1.1px 0px 10.8px -34px rgba(0, 0, 0, 0.059), 7px 0px 81px -34px rgba(0, 0, 0, 0.12);
  // color: var(--text-color-1);
  // padding-bottom: 12px;
  // -webkit-app-region: drag;
}
</style>
