
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
//var buttonEl = document.querySelector("#save-task");

var createTaskElement = function(taskDataObj) {
    var output = document.createElement("li");
    output.className = "task-item";
    var divEl = document.createElement("div");
    divEl.className = "task-info";
    divEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    output.appendChild(divEl);
    tasksToDoEl.appendChild(output);
}

var taskFormHandler = function(event) {
    //console.log(event);
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeValue = document.querySelector("select[name='task-type']").value;
    if(!taskNameInput || !taskTypeValue) {
        alert("Please fill out the form.");
        return false;
    }
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeValue
    };
    formEl.reset();
    createTaskElement(taskDataObj);
}

formEl.addEventListener("submit",taskFormHandler);