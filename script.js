let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoDate = document.getElementById("todoDate");
const todoPriority = document.getElementById("todoPriority");

const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");

const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);

  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  const dueDate = todoDate.value;
  const priority = todoPriority.value;

  if (newTask !== "") {
    todo.push({
      text: newTask,
      date: dueDate,
      priority: priority,
      disabled: false,
    });

    saveToLocalStorage();
    todoInput.value = "";
    todoDate.value = "";
    todoPriority.value = "Medium";
    displayTasks();
  }
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function displayTasks() {
  todoList.innerHTML = "";

  todo.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" ${item.disabled ? "checked" : ""}>
        <div>
          <p class="${item.disabled ? "disabled" : ""}">${item.text}</p>
          <small class="due-date">Due: ${item.date || "No date"}</small>
          <small class="priority ${item.priority.toLowerCase()}">Priority: ${item.priority}</small>
        </div>
        <button class="delete-btn">❌</button>
      </div>
    `;

    li.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTask(index);
    });

    todoList.appendChild(li);
  });

  todoCount.textContent = todo.length;
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
