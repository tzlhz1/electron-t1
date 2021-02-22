const {ipcRenderer} = require('electron')

const Timer = require('timer.js')

function startMork(){
    let workTime = new Timer({
        ontick:()=>{
            updateTime()
        },
        onend:()=>{
            notification()
        }
    })
    workTime.start(10)
}
function updateTime(ms){
    let timerContainer = document.querySelector('#timer-container');
    timerContainer.innerText = ms
}

async function notification(){
    let res = await ipcRenderer.invoke('work-notification')
    if(res==='rest'){
        setTimeout(()=>{
            alert('休息')
        },5*1000)
    }else if(res==='work'){
        startMork()
    }
}

startMork()