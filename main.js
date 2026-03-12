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

function createWindow(){

  win = new BrowserWindow({
    width:280,
    height:340,
    resizable:false,
    alwaysOnTop:true,
    frame:false,
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