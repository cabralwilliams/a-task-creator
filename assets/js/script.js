
var formEl = document.querySelector("#task-form");
//var buttonEl = document.querySelector("#save-task");

var createTaskHandler = function(event) {
    //console.log(event);
    event.preventDefault();
    var newElement = document.createElement("li");
    newElement.className = "task-item";
    newElement.textContent = "A new task was added!";
    document.querySelector("#tasks-to-do").appendChild(newElement);
}

formEl.addEventListener("submit",createTaskHandler);