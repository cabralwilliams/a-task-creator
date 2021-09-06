
//console.dir(window.document);
//var btn = window.document.querySelector("button");
//console.log(btn)
//console.dir(btn);
//console.log(document.querySelector("button").textContent);
var buttonEl = document.querySelector("#save-task");

var createTaskHandler = function() {
    var newElement = document.createElement("li");
    newElement.className = "task-item";
    newElement.textContent = "A new task was added!";
    document.querySelector("#tasks-to-do").appendChild(newElement);
}

//buttonEl.addEventListener("click", function() {
    //alert("Button Clicked!");
    //document.querySelector(".task-list").append(document.createElement("li"));
    //The above can also be accomplished by creating element, adding class to the element via .className, adding the textContent, and then using .appendChild
    //document.querySelector(".task-list").lastChild.classList.add("task-item");
    //document.querySelector(".task-list").lastChild.textContent = "A new task was added!";
//});

buttonEl.addEventListener("click",createTaskHandler);