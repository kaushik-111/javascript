let taskInput = document.getElementById('task-input');
let pendingList = document.getElementById('pending-list');
let completedList = document.getElementById('completed-list');
let addTaskBtn = document.getElementById('add-task');

window.onload = () => {
    let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    existingTasks.forEach(task => {
        let list = document.createElement('div');
        list.setAttribute('data-id', task.id);
        list.className = 'single-task';

        if (task.completed) {
            list.innerHTML = `
                <div>${task.text}</div>
                <div class="button-group">
                    <button class="undo-btn" onclick="undo(${task.id})">
                        <span class="material-symbols-outlined">undo</span>
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            `;
            completedList.appendChild(list);
        } else {
            list.innerHTML = `
                <div>${task.text}</div>
                <div class="button-group">
                    <button class="check-btn" onclick="completed(${task.id})">
                        <span class="material-symbols-outlined">check</span>
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            `;
            pendingList.appendChild(list);
        }
    });
}

const addTask = (event) => {
    event.preventDefault();

    let taskText = taskInput.value;

    if (!taskText) {
        alert('Please enter a task');
        return;
    }

    let newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    existingTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    taskInput.value = '';

    let list = document.createElement('div');
    list.setAttribute('data-id', newTask.id);
    list.innerHTML = `
        <div class="single-task">
            <div>${newTask.text}</div>
            <div class="button-group">
                <button class="check-btn" onclick="completed(${newTask.id})">
                    <span class="material-symbols-outlined">check</span>
                </button>
                <button class="delete-btn" onclick="deleteTask(${newTask.id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `;

    pendingList.appendChild(list);
};

const completed = (id) => {
    let existingTasks = JSON.parse(localStorage.getItem('tasks'));

    existingTasks = existingTasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    let task = document.querySelector(`div[data-id="${id}"]`);
    if (task) {
        pendingList.removeChild(task);
    }

    let completedTask = document.createElement('div');
    completedTask.setAttribute('data-id', id);
    completedTask.innerHTML = `
        <div class="single-task completed">
            <div>${existingTasks.find(task => task.id === id).text}</div>
            <div class="button-group">
                <button class="undo-btn" onclick="undo(${id})">
                    <span class="material-symbols-outlined">undo</span>
                </button>
                <button class="delete-btn" onclick="deleteTask(${id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `;

    completedList.appendChild(completedTask);
}

const undo = (id) => {
    let existingTasks = JSON.parse(localStorage.getItem('tasks'));

    existingTasks = existingTasks.map(task => {
        if (task.id === id) {
            task.completed = false;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    let task = document.querySelector(`div[data-id="${id}"]`);
    if (task) {
        completedList.removeChild(task);
    }

    let pendingTask = document.createElement('div');
    pendingTask.setAttribute('data-id', id);
    pendingTask.innerHTML = `
        <div class="single-task">
            <div>${existingTasks.find(task => task.id === id).text}</div>
            <div class="button-group">
                <button class="check-btn" onclick="completed(${id})">
                    <span class="material-symbols-outlined">check</span>
                </button>
                <button class="delete-btn" onclick="deleteTask(${id})">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `;

    pendingList.appendChild(pendingTask);
}

const deleteTask = (id) => {
    let existingTasks = JSON.parse(localStorage.getItem('tasks'));

    existingTasks = existingTasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    let task = document.querySelector(`div[data-id="${id}"]`);
    if (task) {
        if (task.parentElement.id === 'pending-list') {
            pendingList.removeChild(task);
        } else {
            completedList.removeChild(task);
        }
    }
}