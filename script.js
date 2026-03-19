let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage () {
  let stringiiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringiiedTodoList);

  if(parsedTodoList === null){
    return [];
  }
  else{
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();
// let todoList = [
//   {
//     text: "Learn HTML",
//     uniqueNo : 1
//   },
//   {
//     text: "Learn CSS",
//     uniqueNo : 2
//   },
//   {
//     text: "Learn JavaScript",
//     uniqueNo : 3
//   }
// ];

saveTodoButton.onclick = function(){
  localStorage.setItem("todoList", JSON.stringify(todoList));
}


addTodoButton.onclick = function (){
    onAddTodo();
}

function onTodoStatusChange(checkboxId, labelId, todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo){
      let eachTodoId = "todo" + eachTodo.uniqueNo;
      if(eachTodoId === true){
        return false;
      }else{
        return true;
      }

    });
    let todoObject = todoList[todoObjectIndex];
    if(todoObject.isChecked === true){
      todoObject.isChecked = false;
    }else{
      todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteIndex = todoList.findIndex(function (eachTodo){
      let eachTodoId = "todo" + eachTodo.uniqueNo;
      if(eachTodoId === todoId){
        return true;
      }else{
        return false;
      }
      
    });
    todoList.splice(deleteIndex, 1);
}

function createAndAppendTodo(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo; 
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo"+todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.onclick = function(){
    onTodoStatusChange(checkboxId, labelId, todoId);
  }
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", inputElement.id);
  labelElement.classList.add("checkbox-label");
  labelElement.id = labelId;
  labelElement.textContent = todo.text;
  if(todo.isChecked === true){
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIconContainer.appendChild(deleteIcon);
  deleteIcon.onclick = function (){
    onDeleteTodo(todoId);
  }
}


function onAddTodo(){
    let todosCount = todoList.length;
    todosCount += 1;

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if(userInputValue === ""){
        alert("Enter a valid input");
        return;
    }


    let newTodo = {
        text : userInputValue,
        uniqueNo : todosCount,
        isChecked : false
    };

    todoList.push(newTodo);
    console.log(newTodo);

    createAndAppendTodo(newTodo);
    userInputElement.value = "";

    
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

