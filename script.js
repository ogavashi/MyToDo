const buttonAdd = document.querySelector(".add");
const todoText = document.querySelector(".enteredText");
const todoOnPage = document.querySelector(".list");
const todoUl = document.querySelector("ul");
const deleteButtons = document.querySelectorAll(".todo-delete");

let todoList = [];

if (localStorage.getItem("ToDo")) {
  todoList = JSON.parse(localStorage.getItem("ToDo"));
  render();
}

buttonAdd.addEventListener("click", () => {
  if (!todoText.value) return;
  let todo = {
    isFinished: false,
    isImportnat: false,
    text: todoText.value,
  };
  todoList.push(todo);
  localStorage.setItem("ToDo", JSON.stringify(todoList));
  render();
  todoText.value = "";
});

function render() {
  todoUl.innerHTML = "";
  todoList.forEach((element, index) => {
    localStorage.setItem("ToDo", JSON.stringify(todoList));
    display(element, index);
  });
}

function display(element, index) {
  console.log(todoList);
  const li = document.createElement("li");
  li.classList.add("todo-element");
  const textSpan = document.createElement("span");
  textSpan.classList.add("todo-text");
  textSpan.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (event.button == 2) {
      element.isImportnat = !element.isImportnat;
      textSpan.classList.toggle("todo-important");
    }
    render();
  });
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  if (element.isFinished) {
    checkBox.checked = true;
    textSpan.classList.add("todo-finished");
  }
  if (element.isImportnat) {
    textSpan.classList.add("todo-important");
  }
  checkBox.classList.add("todo-checkbox");
  checkBox.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      element.isFinished = true;
    } else {
      element.isFinished = false;
    }
    render();
  });
  const closeSpan = document.createElement("span");
  closeSpan.classList.add("todo-delete");
  closeSpan.append("X");
  closeSpan.addEventListener("click", () => deleteTodo(index));
  textSpan.append(element.text);
  li.append(checkBox, textSpan, closeSpan);
  li.setAttribute("index", index);
  todoUl.appendChild(li);
  todoOnPage.appendChild(todoUl);
}

function deleteTodo(index) {
  console.log(index);
  todoList.splice(index, 1);
  console.log(todoList);
  localStorage.setItem("ToDo", JSON.stringify(todoList));
  render();
}
