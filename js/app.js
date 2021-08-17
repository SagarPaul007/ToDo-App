let input = document.querySelector(".todo-input");
let add = document.querySelector(".btn");
let todos = document.querySelector(".todo-items");
let complete = document.querySelectorAll(".btn-complete");
let trash = document.querySelectorAll(".btn-trash");
let filter = document.querySelector(".select-filter");

window.addEventListener("DOMContentLoaded", getLocalTodos);

add.addEventListener("click", (e) => {
    e.preventDefault();

    if (input.value !== "") {
        saveLocalTodos(input.value);

        let todo = document.createElement("div");
        todo.classList.add("todo-item");

        let listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.textContent = input.value;
        let completeBtn = document.createElement("div");
        let trashBtn = document.createElement("div");
        completeBtn.classList.add("btn-complete");
        trashBtn.classList.add("btn-trash");
        completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
        trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;

        todo.appendChild(listItem);
        todo.appendChild(completeBtn);
        todo.appendChild(trashBtn);

        todos.appendChild(todo);
        input.value = '';
    }
});

todos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-complete")) {
        let parent = e.target.parentElement;
        parent.classList.toggle("completed");
    }

    if (e.target.classList.contains("btn-trash")) {
        let parent = e.target.parentElement;
        parent.classList.add("move");
        removeLocalTodos(parent);
        parent.addEventListener("transitionend", () => {
            parent.remove();
        });
    }
});

filter.addEventListener("click", () => {
    let todo = todos.querySelectorAll(".todo-item");
    if (filter.value === "all") {
        todo.forEach((item) => {
            item.style.display = "flex";
        });
    } else if (filter.value === "completed") {
        todo.forEach((item) => {
            if (!item.classList.contains("completed")) {
                item.style.display = "none";
            } else {
                item.style.display = "flex";
            }
        });
    } else if (filter.value === "incomplete") {
        todo.forEach((item) => {
            if (item.classList.contains("completed")) {
                item.style.display = "none";
            } else {
                item.style.display = "flex";
            }
        });
    }
});

document.querySelector(".sort").addEventListener("click", () => {
    todos.classList.toggle("sorted");
});

function saveLocalTodos(todo) {
    let localTodos;
    if (localStorage.getItem("localTodos") === null) localTodos = [];
    else localTodos = JSON.parse(localStorage.getItem("localTodos"));
    localTodos.push(todo);
    localStorage.setItem("localTodos", JSON.stringify(localTodos));
}

function getLocalTodos() {
    let localTodos;
    if (localStorage.getItem("localTodos") === null) localTodos = [];
    else localTodos = JSON.parse(localStorage.getItem("localTodos"));

    localTodos.forEach((item) => {
        let todo = document.createElement("div");
        todo.classList.add("todo-item");

        let listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.textContent = item;
        let completeBtn = document.createElement("div");
        let trashBtn = document.createElement("div");
        completeBtn.classList.add("btn-complete");
        trashBtn.classList.add("btn-trash");
        completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
        trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;

        todo.appendChild(listItem);
        todo.appendChild(completeBtn);
        todo.appendChild(trashBtn);

        todos.appendChild(todo);
    });
}

function removeLocalTodos(todo) {
    let localTodos;
    if (localStorage.getItem("localTodos") === null) localTodos = [];
    else localTodos = JSON.parse(localStorage.getItem("localTodos"));
    let item = todo.querySelector(".list-item").textContent;
    let i = localTodos.indexOf(item);
    if (i !== -1) localTodos.splice(i, 1);
    localStorage.setItem("localTodos", JSON.stringify(localTodos));
}