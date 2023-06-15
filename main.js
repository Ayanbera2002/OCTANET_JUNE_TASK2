const todoInput = document.querySelector(".todo-input");
const prioritySelect = document.querySelector(".priority-select");
const dateInput = document.querySelector(".date-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const priority = prioritySelect.value;

    const prioritySpan = document.createElement("span");
    prioritySpan.innerText = priority;
    prioritySpan.classList.add("priority");
    todoDiv.appendChild(prioritySpan);

    const dateSpan = document.createElement("span");
    dateSpan.innerText = formatDate(dateInput.value);
    dateSpan.classList.add("date");
    todoDiv.appendChild(dateSpan);

    saveLocalTodos(todoInput.value, priority, dateInput.value);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
    dateInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (filterOption.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

function saveLocalTodos(todo, priority, date) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push({ title: todo, priority: priority, date: date });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo.title;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const prioritySpan = document.createElement("span");
        prioritySpan.innerText = todo.priority;
        prioritySpan.classList.add("priority");
        todoDiv.appendChild(prioritySpan);

        const dateSpan = document.createElement("span");
        dateSpan.innerText = formatDate(todo.date);
        dateSpan.classList.add("date");
        todoDiv.appendChild(dateSpan);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoTitle = todo.querySelector(".todo-item").innerText;
    const todoPriority = todo.querySelector(".priority").innerText;
    const todoDate = todo.querySelector(".date").innerText;
    todos = todos.filter(
        (item) =>
            item.title !== todoTitle ||
            item.priority !== todoPriority ||
            item.date !== todoDate
    );
    localStorage.setItem("todos", JSON.stringify(todos));
}