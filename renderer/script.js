let tasks = []

const inputBox = document.getElementById("taskInput")
const taskList = document.getElementById("taskList")
const closeBtn = document.getElementById("closeBtn")
const saveBtn = document.getElementById("saveTaskBtn")

saveBtn.addEventListener("click", addTask)
closeBtn.addEventListener("click", () => window.close())

async function loadTasks(){
  tasks = await window.jinxAPI.getTasks()
  renderTasks()
}

loadTasks()

async function addTask(){

  if(inputBox.value.trim()==="") return

  const task={
    text:inputBox.value,
    carryForward:false
  }

  tasks.push(task)

  await window.jinxAPI.saveTasks(tasks)

  renderTasks()

  inputBox.value=""
}

function renderTasks(){

  taskList.innerHTML=""

  tasks.forEach((task,index)=>{

    const li=document.createElement("li")

    li.innerHTML=`
    <input type="checkbox" data-index="${index}" class="doneBox">

    ${task.text}

    <label>
    <input type="checkbox" ${task.carryForward ? "checked":""} data-repeat="${index}" class="repeatBox">
    ↺
    </label>
    `

    taskList.appendChild(li)

  })

  document.querySelectorAll(".doneBox").forEach(box=>{
    box.addEventListener("change",removeTask)
  })

  document.querySelectorAll(".repeatBox").forEach(box=>{
    box.addEventListener("change",toggleRepeat)
  })
}

async function toggleRepeat(e){

  const i=e.target.dataset.repeat

  tasks[i].carryForward=!tasks[i].carryForward

  await window.jinxAPI.saveTasks(tasks)
}

async function removeTask(e){

  const li = e.target.parentElement
  li.classList.add("removing")

  setTimeout(async ()=>{

    const i=e.target.dataset.index
    tasks.splice(i,1)

    await window.jinxAPI.saveTasks(tasks)

    renderTasks()

  },300)

}

inputBox.addEventListener("keypress",function(e){
if(e.key==="Enter"){
addTask()
}
})