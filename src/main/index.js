import console from 'console'
import { app, BrowserWindow ,Tray} from 'electron' // 引入 app 和 BrowserWindow
import {options} from './windowList'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
  
}
console.log('dev---->',`${__static}`)
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const createSettingWindow = ()=>{
  
}
function createWindow () {
  /**
   * Initial window options
   */
  
  mainWindow = new BrowserWindow(options) // 创建一个窗口

  mainWindow.loadURL(winURL) // 加载窗口 的 url =>来自renderer进程的页面

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
}

app.on('ready', createWindow) // app 准备好的时候创建窗口

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) //所有窗口 被关闭触发

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
}) // 当进程处于活动状态时触发

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

let tray = null
app.whenReady().then(() => {
  tray = new Tray(`${__static}/menubar.png`) // ${__static} 当前static 路径
})