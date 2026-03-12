let tasks = []

const addBtn=document.getElementById("addTaskBtn")
const saveBtn=document.getElementById("saveTaskBtn")
const inputBox=document.getElementById("taskInput")
const inputContainer=document.getElementById("taskInputContainer")
const taskList=document.getElementById("taskList")
const closeBtn=document.getElementById("closeBtn")

addBtn.addEventListener("click",showInput)
saveBtn.addEventListener("click",addTask)
closeBtn.addEventListener("click",()=>window.close())

async function loadTasks(){

tasks=await window.jinxAPI.getTasks()

renderTasks()

}

loadTasks()

function showInput(){

inputContainer.classList.remove("hidden")
inputBox.focus()

}

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
inputContainer.classList.add("hidden")

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

async function removeTask(e){

const i=e.target.dataset.index

tasks.splice(i,1)

await window.jinxAPI.saveTasks(tasks)

renderTasks()

}

async function toggleRepeat(e){

const i=e.target.dataset.repeat

tasks[i].carryForward=!tasks[i].carryForward

await window.jinxAPI.saveTasks(tasks)

}