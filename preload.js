const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("jinxAPI",{

  getTasks:()=> ipcRenderer.invoke("getTasks"),

  saveTasks:(tasks)=> ipcRenderer.invoke("saveTasks",tasks)

})