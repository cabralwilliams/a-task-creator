
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
//var buttonEl = document.querySelector("#save-task");

var createTaskHandler = function(event) {
    //console.log(event);
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeValue = document.querySelector("select[name='task-type']").value;
    var liToAdd = document.createElement("li");
    liToAdd.className = "task-item";
    var newElement = document.createElement("div");
    newElement.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeValue +"</span>";
    liToAdd.appendChild(newElement)
    //newElement.textContent = taskNameInput;
    tasksToDoEl.appendChild(liToAdd);
    console.dir(liToAdd);
}

formEl.addEventListener("submit",createTaskHandler);