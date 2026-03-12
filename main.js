const { app, BrowserWindow, powerMonitor, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store').default

const store = new Store()

let win

ipcMain.handle("getTasks", () => {
  return store.get("tasks") || []
})

ipcMain.handle("saveTasks", (event, tasks) => {
  store.set("tasks", tasks)
})

function dailyTaskReset(){

  const tasks = store.get("tasks") || []

  const updatedTasks = tasks.filter(task => task.carryForward)

  store.set("tasks", updatedTasks)

  console.log("Jinx: 3AM reset complete")

}

function checkTimeForReset(){

  const now = new Date()

  if(now.getHours() === 3 && now.getMinutes() === 0){
    dailyTaskReset()
  }

}
const { screen } = require("electron")

function createWindow(){

  const display = screen.getPrimaryDisplay()
  const { width, height } = display.workAreaSize

  win = new BrowserWindow({
    width:280,
    height:340,
    x: width - 300,
    y: height - 360,
    frame:false,
    resizable:false,
    alwaysOnTop:true,
    webPreferences:{
      preload:path.join(__dirname,"preload.js")
    }
  })

  win.loadFile("renderer/index.html")

}

app.whenReady().then(()=>{

  createWindow()

  setInterval(checkTimeForReset,60000)

  powerMonitor.on("unlock-screen",()=>{
    if(!win) createWindow()
    else win.show()
  })

})

app.setLoginItemSettings({
  openAtLogin:true
})

const { Notification } = require("electron")

function hourlyReminder(){

  const tasks = store.get("tasks") || []

  const pending = tasks.length

  if(pending > 0){

    new Notification({
      title:"Jinx Reminder",
      body:`You still have ${pending} unfinished task(s)`
    }).show()

  }

}

setInterval(hourlyReminder, 3600000)
