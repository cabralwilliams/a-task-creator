var localTasks = localStorage.getItem("tasks");
var tasks;
if(localTasks === null) {
    tasks = [];
    localStorage.setItem("tasks",JSON.stringify(tasks));
} else {
    tasks = JSON.parse(localTasks);
}

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var nextIdEl = document.querySelector("#next-id");
//var buttonEl = document.querySelector("#save-task");
var taskIdCounter = 0;

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

var createListElement = function(taskObject) {
    var outputEl = document.createElement("li"); //Create list element
    outputEl.className = "task-item";
    var outputDiv = document.createElement("div"); //Create div to sit in list element
    outputEl.setAttribute("data-task-id",taskObject.taskId); //Set the data task id on the list element
    outputDiv.innerHTML = "<h3 class='task-name'>" + taskObject.name + "</h3><span class='task-type'>" + taskObject.type + "</span>"; //Html that sits in the div
    var interactionEl = createTaskActions(taskObject.taskId); //Create the interaction elements within the task item
    outputEl.appendChild(outputDiv); //Place the div in the list element
    outputEl.appendChild(interactionEl); //Place the interaction elements in the list element
    return outputEl;
}

var loadTasks = function() {
    for(var i = 0; i < tasks.length; i++) {
        var tempTask = createListElement(tasks[i]);
        if(tasks[i].taskStatus === "to do") {
            document.querySelector("ul[id='tasks-to-do']").appendChild(tempTask);
        } else if(tasks[i].taskStatus === "in progress") {
            document.querySelector("ul[id='tasks-in-progress']").appendChild(tempTask);
        } else if(tasks[i].taskStatus === "completed") {
            document.querySelector("ul[id='tasks-completed']").appendChild(tempTask);
        }
    }
}

//Find the next available taskId number if 0 isn't available
var incrementId = function() {
    var taskIds = [];
    for(var i = 0; i < tasks.length; i++) {
        taskIds.push(tasks[i].taskId);
    }
    taskIds = taskIds.sort(function(a,b ) { return a - b;});
    if(taskIds[0] === 0) {
        var index = 0;
        do {
            index++;
            taskIdCounter++;
        } while(taskIds[index] === taskIds[index - 1] + 1);
    }
}

var createHiddenInput = function(nextId) {
    var output = document.createElement("input");
    output.type = "hidden";
    output.value = nextId;
    output.name = "next-task-id";
    return output;
}

loadTasks();
incrementId();

nextIdEl.appendChild(createHiddenInput(taskIdCounter));

var editTask = function(taskId) {
    var queryString = "li[data-task-id='" + taskId + "']";
    var taskName = document.querySelector(queryString).querySelector("div").querySelector("h3").textContent;
    var taskType = document.querySelector(queryString).querySelector("div").querySelector("span").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save"; //Temporarily alter the button text
    document.querySelector("#next-id").firstChild.value = taskId;
    
}

var deleteTask = function(taskId) {
    var queryString = "li[data-task-id='" + taskId + "']";
    var newTasks = [];
    for(var i = 0; i < tasks.length; i++) {
        if(tasks[i].taskId !== taskId) {
            newTasks.push(tasks[i]);
        }
    }
    tasks = newTasks;
    saveTasks();
    document.querySelector(queryString).remove();
}

var updateStatus = function(taskId) {
    var queryString = "li[data-task-id='" + taskId + "']";
    var copiedEl = document.querySelector(queryString);
    var taskStatus = copiedEl.querySelector("select").value;
    deleteTask(taskId);
    if(taskStatus.toLowerCase() === "to do") {
        document.querySelector("ul[id='tasks-to-do']").appendChild(copiedEl);
    } else if(taskStatus.toLowerCase() === "in progress") {
        document.querySelector("ul[id='tasks-in-progress']").appendChild(copiedEl);
    } else if(taskStatus.toLowerCase() === "completed") {
        document.querySelector("ul[id='tasks-completed']").appendChild(copiedEl);
    }
    for(var i = 0; i < tasks.length; i++) {
        if(tasks[i].taskId === taskId) {
            tasks[i].taskStatus = taskStatus.toLowerCase();
            break;
        }
    }
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
        tasks.push(taskDataObj);
        saveTasks();
        //Increment taskIdCounter
        taskIdCounter++;
    } else {
        document.querySelector(queryString).querySelector("div").querySelector("h3").textContent = taskDataObj.name;
        document.querySelector(queryString).querySelector("div").querySelector("span").textContent = taskDataObj.type;
        document.querySelector("#save-task").textContent = "Add Task"; //Reset save-task button text
        for(var i = 0; i < tasks.length; i++) {
            if(tasks[i].taskId === taskDataObj.taskId) {
                tasks[i].name = taskDataObj.name;
                tasks[i].type = taskDataObj.type;
                break;
            }
        }
        saveTasks();
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
        taskId: parseInt(taskIdValue),
        taskStatus: "to do"
    };
    formEl.reset();
    createTaskElement(taskDataObj);
}

var saveTasks = function() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
formEl.addEventListener("submit",taskFormHandler);