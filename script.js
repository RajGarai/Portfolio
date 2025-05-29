let tasks = [];

function addTask() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const datetime = document.getElementById('datetime').value;

  if (!title || !description || !datetime) {
    alert("Please fill out all fields.");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    datetime,
    completed: false,
    createdAt: new Date(datetime).toLocaleString(),
    completedAt: null
  };

  tasks.push(newTask);

  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('datetime').value = '';

  renderTasks();
}

function renderTasks() {
  const pending = document.getElementById('pendingTasks');
  const completed = document.getElementById('completedTasks');
  pending.innerHTML = '';
  completed.innerHTML = '';

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  sortedTasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    taskDiv.innerHTML = `
      <div>
        <strong>${task.title}</strong><br>
        ${task.description}<br>
        <small>Scheduled: ${task.createdAt}</small>
        ${task.completed ? `<br><small>Completed: ${task.completedAt}</small>` : ''}
      </div>
      <div class="task-buttons">
        <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    if (task.completed) {
      completed.appendChild(taskDiv);
    } else {
      pending.appendChild(taskDiv);
    }
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toLocaleString() : null;
    }
    return task;
  });
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit Title", task.title);
  const newDesc = prompt("Edit Description", task.description);
  const newDatetime = prompt("Edit Date and Time (YYYY-MM-DDTHH:MM)", task.datetime);
  if (newTitle && newDesc && newDatetime) {
    task.title = newTitle;
    task.description = newDesc;
    task.datetime = newDatetime;
    task.createdAt = new Date(newDatetime).toLocaleString();
    renderTasks();
  }
}

