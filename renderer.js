const {ipcRenderer} = require('electron')

const Timer = require('timer.js')

function startMork(){
    let workTime = new Timer({
        ontick:(ms)=>{
            updateTime(ms)
        },
        onend:()=>{
            notification()
        }
    })
    workTime.start(3)
}
function updateTime(ms){
    let timerContainer = document.querySelector('#timer-container');
    let s = (ms/1000).toFixed(0)
    let ss = (s/60).toFixed(0)
    timerContainer.innerText = `${ss.toString().padStart(2,0)} : ${s.toString().padStart(2,0)}`
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