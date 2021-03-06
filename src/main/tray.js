import { app, BrowserWindow, Tray ,Menu } from 'electron'

let tray = null
app.whenReady().then(() => {
    tray = new Tray(`${__static}/menubar.png`) // ${__static} 当前static 路径
    tray.on("right-click",()=>{
        // window.hide()
        const  menu =  Menu.buildFromTemplate([
            {
                label: '打开',
                click: () => {
                  console.log('OPEN')
                }
              }, {
                label: '退出',
                click: () => {
                  app.quit()
                }
              }
        ]) 
        console.log('right click')
        tray.popUpContextMenu(menu)
    })
})