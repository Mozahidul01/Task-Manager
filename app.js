document.getElementById("taskInputForm").addEventListener("submit", submitTask);

function submitTask(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("taskDescription");
  const severity = getInputValue("taskSeverity");
  const assignedTo = getInputValue("taskAssignedTo");
  const id = Math.floor(Math.random() * 1000) + "";
  let status = "Open";

  const task = { id, description, severity, assignedTo, status };
  let tasks = [];
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  if (id && description && severity && assignedTo) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    alert("Fields Must not be Empty!");
  }

  document.getElementById("taskInputForm").reset();
  fetchTasks();
  e.preventDefault();
}

const closeTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const currentTask = tasks.find((task) => task.id == id);
  currentTask.status = "Closed";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  fetchTasks();
};

const deleteTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const remainingTasks = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(remainingTasks));
  fetchTasks();
};

const fetchTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const tasksList = document.getElementById("tasksList");
  
    tasksList.innerHTML = "";
    
    let closedTask = 0;
    let openTask = 0;

  for (var i = 0; i < tasks.length; i++) {
    const { id, description, severity, assignedTo, status } = tasks[i];

      if (status === "Closed") {
          closedTask++;
      descriptionToShow = `<h3 class="task-title" style="text-decoration:line-through"> ${description} </h3>`;
      closeBtn = ` <button href="#" disabled id="closeBtn" class="btn btn-outline-warning">Close</button>`;
      statusToshow = `<div id="status" class="tag closed">${status}</div>`;
    } else {
        openTask++;
      descriptionToShow = `
            <h3 class="task-title"> ${description} </h3>
        `;
      closeBtn = `<button href="#" onclick="closeTask(${id})" id="closeBtn" class="btn btn-outline-warning">Close</button>`;
      statusToshow = `<div id="status" class="tag open">${status}</div>`;
      }
      
    document.getElementById('OpenTaskCount').innerText = openTask;
    document.getElementById('closedTaskCount').innerText = closedTask;
    document.getElementById('totalTaskCount').innerText = openTask + closedTask;

    tasksList.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card task">
            <div class="card-header">
                <h6>Task ID: ${id} </h6>
            </div>
            <div class="card-body">
                <div class="hstack gap-2">
                    ${statusToshow}
                    <div id="${severity}" class="tag">
                        <i class="bi bi-exclamation-circle"></i>
                        ${severity}
                    </div>
                </div>
                <div class="task-info py-3">
                    ${descriptionToShow}
                    <p class="task-responsible">
                        <i class="bi bi-person-circle"></i>
                        ${assignedTo}
                    </p>
                </div>
                <div class="text-end">
                    ${closeBtn}
                    <a href="#" onclick="deleteTask(${id})" class="btn btn-outline-danger">Delete</a>
                </div>
            </div>
        </div>
    </div>
    `;

    if (status === "Closed") {
      const taskStatus = document.getElementById("status").classList;

      taskStatus.remove("open");
      taskStatus.add("closed");
    }
  }
};
