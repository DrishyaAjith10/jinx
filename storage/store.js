const Store = require('electron-store')

const store = new Store()

function getTasks(){
    return store.get("tasks") || []
}

function saveTasks(tasks){
    store.set("tasks", tasks)
}

module.exports = { getTasks, saveTasks }