import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import VueDevTools from 'vite-plugin-vue-devtools'

// import electronRenderer from 'vite-plugin-electron/renderer'
// import polyfillExports from 'vite-plugin-electron/polyfill-exports'
// import optimizer from 'vite-plugin-optimizer'

let getReplacer = () => {
  let externalModels = [
    'electron',
    'os',
    'fs-extra',
    'path',
    'events',
    'child_process',
    'crypto',
    'http',
    'buffer',
    'url',
    'better-sqlite3',
    'knex',
  ]
  let result = {}
  for (let item of externalModels) {
    ;(result as any)[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    })
  }
  return result
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    // optimizer(getReplacer()),
    // VueDevTools(),
    vue(),
    electron([
      {
        entry: 'electron/main/main.ts',
        vite: {
          build: {
            outDir: 'appDir/main',
          },
        },
      },
      {
        entry: 'electron/main/preload.ts',
        vite: {
          build: {
            outDir: 'appDir/preload',
          },
        },
      },
    ]),
  ],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/global.scss" as global;',
      },
    },
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
})
