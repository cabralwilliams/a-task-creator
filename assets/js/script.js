
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var nextIdEl = document.querySelector("#next-id");
//var buttonEl = document.querySelector("#save-task");
var taskIdCounter = 0;
var createHiddenInput = function(nextId) {
    var output = document.createElement("input");
    output.type = "hidden";
    output.value = nextId;
    output.name = "next-task-id";
    return output;
}

nextIdEl.appendChild(createHiddenInput(taskIdCounter));

var editTask = function(taskId) {
    var queryString = "li[data-task-id='" + taskId + "']";
    var taskName = document.querySelector(queryString).querySelector("div").querySelector("h3").textContent;
    var taskType = document.querySelector(queryString).querySelector("div").querySelector("span").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save"; //Temporarily alter the button text
    document.querySelector("#next-id").firstChild.value = taskId;
    /*
    var queryString = "li[data-task-id='" + taskId + "']";
    var copiedEl = document.querySelector(queryString);
    var taskStatus = copiedEl.querySelector("select").value;
    var statusChoices = ["To Do","In Progress","Completed"];
    if(copiedEl.parentElement.id === "tasks-to-do") {
        if(taskStatus !== "To Do") {
            deleteTask(taskId);
            if(taskStatus === "In Progress") {
                document.querySelector("#tasks-in-progress").appendChild(copiedEl);
            } else if(taskStatus === "Completed") {
                document.querySelector("#tasks-completed").appendChild(copiedEl);
            }
        }
    } else if(copiedEl.parentElement.id === "tasks-in-progress") {
        if(taskStatus !== "In Progress") {
            deleteTask(taskId);
            if(taskStatus === "To Do") {
                document.querySelector("#tasks-to-do").appendChild(copiedEl);
            } else if(taskStatus === "Completed") {
                document.querySelector("#tasks-completed").appendChild(copiedEl);
            }
        }
    } else {
        if(taskStatus !== "tasks-completed") {
            deleteTask(taskId);
            if(taskStatus === "To Do") {
                document.querySelector("#tasks-to-do").appendChild(copiedEl);
            } else if(taskStatus === "In Progress") {
                document.querySelector("#tasks-in-progress").appendChild(copiedEl);
            }
        }
    }
    */
}

var deleteTask = function(taskId) {
    var queryString = "li[data-task-id='" + taskId + "']";
    document.querySelector(queryString).remove();
}

var updateStatus = function(taskId) {
    var queryString = "li[data-task-id='" + taskId + "']";
    var copiedEl = document.querySelector(queryString);
    var taskStatus = copiedEl.querySelector("select").value;
    deleteTask(taskId);
    if(taskStatus === "To Do") {
        document.querySelector("ul[id='tasks-to-do']").appendChild(copiedEl);
    } else if(taskStatus === "In Progress") {
        document.querySelector("ul[id='tasks-in-progress']").appendChild(copiedEl);
    } else if(taskStatus === "Completed") {
        document.querySelector("ul[id='tasks-completed']").appendChild(copiedEl);
    }
}

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);
    var editString = "editTask(" + taskId + ")";
    editButtonEl.setAttribute("onclick",editString);
    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id",taskId);
    var deleteString = "deleteTask(" + taskId + ")";
    deleteButtonEl.setAttribute("onclick",deleteString);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusChoices = ["To Do","In Progress","Completed"];

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    var updateString = "updateStatus(" + taskId +")";
    statusSelectEl.setAttribute("onchange",updateString);
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
    var queryString = "li[data-task-id='" + taskDataObj.taskId + "']";
    var taskEl = document.querySelector(queryString);
    if(taskEl === null) {
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
    } else {
        document.querySelector(queryString).querySelector("div").querySelector("h3").textContent = taskDataObj.name;
        document.querySelector(queryString).querySelector("div").querySelector("span").textContent = taskDataObj.type;
        document.querySelector("#save-task").textContent = "Add Task"; //Reset save-task button text
    }
    nextIdEl.firstChild.value = taskIdCounter;
}

var taskFormHandler = function(event) {
    //console.log(event);
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeValue = document.querySelector("select[name='task-type']").value;
    var taskIdValue = document.querySelector("#next-id").firstChild.value;
    if(!taskNameInput || !taskTypeValue) {
        alert("Please fill out the form.");
        return false;
    }
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeValue,
        taskId: taskIdValue
    };
    formEl.reset();
    createTaskElement(taskDataObj);
}

formEl.addEventListener("submit",taskFormHandler);