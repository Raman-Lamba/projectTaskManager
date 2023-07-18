const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");
let taskList = [];

// Load tasks from storage
function loadTasks() {
  if (localStorage.getItem("tasks")) {
    taskList = JSON.parse(localStorage.getItem("tasks"));
    taskList.forEach(task => {
      tasks.innerHTML += `<li>
                            <span>${task}</span>
                            <i class="bi bi-trash-fill delete"></i>
                          </li>`;
    });
    updateMessage();
  }
}

// Save tasks to storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function updateMessage() {
  const textLength = taskList.length;
  messageSpan.textContent = `You have ${textLength} pending task${textLength !== 1 ? 's' : ''}.`;
}
updateMessage();
// Add task
addForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = addForm.task.value.trim();

  if (value.length) {
    taskList.push(value);
    tasks.innerHTML += `<li>
                          <span>${value}</span>
                          <i class="bi bi-trash-fill delete"></i>
                        </li>`;
    addForm.reset();
    updateMessage();
    saveTasks();
  }
});

// Delete task
tasks.addEventListener("click", event => {
  if (event.target.classList.contains("delete")) {
    const taskItem = event.target.parentElement;
    const taskIndex = Array.from(tasks.children).indexOf(taskItem);
    taskItem.remove();
    taskList.splice(taskIndex, 1);
    updateMessage();
    saveTasks();
  }
});

// Clear all tasks
clearAll.addEventListener("click", event => {
  tasks.innerHTML = "";
  taskList = [];
  updateMessage();
  saveTasks();
});

// Filter tasks
function filterTask(term) {
  Array.from(tasks.children).forEach(task => {
    const taskText = task.querySelector("span").textContent.toLowerCase();
    if (taskText.includes(term)) {
      task.classList.remove("hide");
    } else {
      task.classList.add("hide");
    }
  });
}

// Search tasks
searchForm.addEventListener("keyup", event => {
  const term = searchForm.task.value.trim().toLowerCase();
  filterTask(term);
});

searchForm.addEventListener("click", event => {
  if (event.target.classList.contains("reset")) {
    searchForm.reset();
    const term = searchForm.task.value.trim();
    filterTask(term);
  }
});

// Load tasks on page load
window.addEventListener("load", loadTasks);
