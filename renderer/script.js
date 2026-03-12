let tasks = []

async function loadTasks(){

tasks = await window.jinxAPI.getTasks()

renderTasks()

}

loadTasks()



function showInput(){

const container = document.getElementById("taskInputContainer")

container.style.display = "flex"

}

async function addTask(){

const input = document.getElementById("taskInput")

if(input.value.trim()==="") return

const task = {
text: input.value,
done:false,
carryForward:false
}

tasks.push(task)

await window.jinxAPI.saveTasks(tasks)

renderTasks()

input.value=""

document.getElementById("taskInputContainer").style.display="none"

}

function renderTasks(){

const list = document.getElementById("taskList")

list.innerHTML=""

tasks.forEach((task,index)=>{

const li=document.createElement("li")

li.innerHTML = `
  <input type="checkbox" onchange="toggleDone(${index})">

  ${task.text}

  <label>
  <input type="checkbox"
  ${task.carryForward ? "checked" : ""}
  onchange="carryForward(${index})">
  ↺
  </label>
`

list.appendChild(li)

})

}

async function toggleDone(i){

tasks.splice(i,1)

await window.jinxAPI.saveTasks(tasks)

renderTasks()

}

async function carryForward(i){

  tasks[i].carryForward = !tasks[i].carryForward

  await window.jinxAPI.saveTasks(tasks)

}
renderTasks()