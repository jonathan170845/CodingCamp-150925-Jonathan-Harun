const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterSelect = document.getElementById("filterSelect");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoList = document.getElementById("todoList");

let todos = [];

function renderTodos() {
    const filter = filterSelect.value;
    let filteredTodos = todos;

    if (filter === "pending") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    todoList.innerHTML = "";
    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td class="${todo.completed ? 'status-done' : ''}">${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.completed ? "Done" : "Pending"}</td>
        <td>
            <button class="action-btn complete-btn" onclick="toggleComplete(${index})">✓</button>
            <button class="action-btn delete-btn" onclick="deleteTask(${index})">🗑</button>
        </td>
        `;

        todoList.appendChild(row);
    });
}

addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        alert("Please enter both task and due date!");
        return;
    }

    todos.push({ task, date, completed: false });
    taskInput.value = "";
    dateInput.value = "";
    renderTodos();
});

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}

deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure to delete all tasks?")) {
        todos = [];
        renderTodos();
    }
});

filterSelect.addEventListener("change", renderTodos);

renderTodos();
