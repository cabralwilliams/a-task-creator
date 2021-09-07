
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
//var buttonEl = document.querySelector("#save-task");
var taskIdCounter = 0;

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusChoices = ["To Do","In Progress","Completed"];

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    for(var i = 0; i < statusChoices.length; i++) {
        var optionEl = document.createElement("option");
        optionEl.setAttribute("value",statusChoices[i]);
        optionEl.textContent = statusChoices[i];
        statusSelectEl.appendChild(optionEl)
    }
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}

var createTaskElement = function(taskDataObj) {
    var output = document.createElement("li");
    output.className = "task-item";

    //Add custom id to each list item
    output.setAttribute("data-task-id",taskIdCounter)

    var divEl = document.createElement("div");
    divEl.className = "task-info";
    divEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    output.appendChild(divEl);
    var interactionEl = createTaskActions(taskIdCounter);
    output.appendChild(interactionEl);

    tasksToDoEl.appendChild(output);

    //Increment taskIdCounter
    taskIdCounter++;
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