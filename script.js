let todoItemsContainer = document.getElementById("todoItemsContainer");

let todoList = [
    {
        text : "Learn HTML",
        todoId : 1
    },
    {
        text : "Learn CSS",
        todoId : 2
    },
    {
        text : "Learn Javascript",
        todoId : 3
    }
];

function createAndAppendTodo(todo){
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-conatiner", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);
    
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = "checkboxInput" + todo.todoId;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);
    
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", inputElement.id);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);
    
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
    
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
}

for(let todoItem of todoList){
    createAndAppendTodo(todoItem);
}