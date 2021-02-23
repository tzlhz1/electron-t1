const  {app,BrowserWindow,Notification,ipcMain} = require('electron')

let win;
app.on('ready',()=>{
    win = new BrowserWindow({
        width:300,
        height:300,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    })
    win.loadFile('./index.html')
    handleIPC()
})

function handleIPC(){
    ipcMain.handle('work-notification',async function (){
        let res = await new Promise((res,rej)=>{
            let notification = new Notification({
                title:'任务结束',
                body:'是否开始休息',
                actions:[{text:'开始休息',type:'button'}],
                closeButtonText:'继续工作'
            })
            notification.show()
            notification.on('action',()=>{
                res('rest')
            })
            notification.on('close',()=>{
                res('work')
            })
        })
        
    })
}
