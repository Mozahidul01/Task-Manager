document.getElementById('taskInputForm').addEventListener('submit', submitTask);

function submitTask(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('taskDescription');
  const severity = getInputValue('taskSeverity');
  const assignedTo = getInputValue('taskAssignedTo');
  const id = Math.floor(Math.random()*10000) + '';
  let status = 'Open';

  const task = { id, description, severity, assignedTo, status };
  let tasks = [];
  if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  document.getElementById('taskInputForm').reset();
  fetchTasks();
  e.preventDefault();
}

const closeTask = id => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const currentTask = tasks.find(task => task.id === id);
  currentTask.status = 'Closed';
  localStorage.setItem('tasks', JSON.stringify(tasks));
  fetchTasks();
}

const deleteTask = id => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const remainingTasks = tasks.filter( task.id !== id )
  localStorage.setItem('tasks', JSON.stringify(remainingTasks));
}

const fetchTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const tasksList = document.getElementById('tasksList');
  tasksList.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    const {id, description, severity, assignedTo, status} = tasks[i];

    tasksList.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card task">
            <div class="card-header">
                <h6>Task ID: ${id} </h6>
            </div>
            <div class="card-body">
                <div class="hstack gap-3">
                    <div class="text-bg-warning status">${status}</div>
                    <div class="text-bg-warning status">${severity}</div>
                </div>
                <div class="task-info py-3">
                    <h4 class="card-title">${description} </h4>
                    <p class="card-text">${assignedTo}</p>
                </div>
                <div class="text-end">
                    <a href="#" onclick="setStatusClosed(${id})" class="btn btn-outline-warning">Close</a>
                    <a href="#" onclick="deleteTask(${id})" class="btn btn-outline-danger">Delete</a>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}
