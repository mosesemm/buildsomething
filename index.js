let tasks = [];
let outputTblBody;
let editOrView;
let taskEdit;
let doneEdit;
let updateBtn;
let selectedTask = {};

(function(){
    outputTblBody = document.getElementById("outputTblBody");
    editOrView = document.getElementById("editOrView");
    taskEdit = document.getElementById("taskEdit");
    doneEdit = document.getElementById("doneEdit");
    updateBtn = document.getElementById("updateBtn");

    const addBtn = document.getElementById("addBtn");
    const todoTxt = document.getElementById("todoTxt");
    const errorFeedback = document.getElementById("errorFeedback");

    addBtn.onclick = function(event) {
        event.preventDefault();
        errorFeedback.innerText = "";
        errorFeedback.style.display = "none";

        let todoVal = todoTxt.value;
        todoTxt.classList.remove("is-invalid");

        //validate
        if(!todoVal || !todoVal.trim()) {
            errorFeedback.innerText = "Task description is required";
            errorFeedback.style.display = "block";
            todoTxt.classList.add("is-invalid");
            return;
        }

        //prepare the data
        const task = {
            description: todoVal,
            done: false
        }

        tasks.push(task);

        renderTable();
        
        //clear control
        todoTxt.value = "";

    }

})()

function renderTable() {
    const tableBody = tasksToRows(tasks);
    outputTblBody.innerHTML = tableBody.join("");
}

function tasksToRows(_tasks) {
    return _tasks.map(t => {
        return `<tr style="${rowStroke(t)}"><td>${t.description}</td><td><a class="btn btn-outline-secondary" data-task="${btoa(JSON.stringify(t))}" href="#" id="viewTask" onClick="editOrViewTask(this.dataset.task)">Edit/View</a> 
        <a href="#" class="btn btn-outline-danger" data-task="${btoa(JSON.stringify(t))}" onClick="event.preventDefault();deleteTask(this.dataset.task)">Delete</a></td></tr>`;
    });
}

function rowStroke(task) {
    return task.done?"text-decoration: line-through;": "";
}

function editOrViewTask(_task) {
    const task = JSON.parse(atob(_task));
    selectedTask = task;
    editOrView.style.display = "block";
    taskEdit.value = task.description;
    doneEdit.checked = task.done;

}

function deleteTask(_task){
    const task = JSON.parse(atob(_task));
    tasks = tasks.filter(t => !(t.description === task.description && t.done === task.done ) );
    renderTable();
}

updateBtn.onclick =  function(event) {
    event.preventDefault();
    const taskEditValue = taskEdit.value;
    const done = doneEdit.checked;
    const newTask = {description: taskEditValue, done};

    //hmm duplicate

    errorFeedbackView.innerText = "";
    errorFeedbackView.style.display = "none";

    taskEdit.classList.remove("is-invalid");

    //validate
    if(!newTask.description || !newTask.description.trim()) {
        errorFeedbackView.innerText = "Task description is required";
        errorFeedbackView.style.display = "block";
        taskEdit.classList.add("is-invalid");
        return;
    }

    tasks = tasks.filter(t => !(t.description === selectedTask.description && t.done === selectedTask.done ) );
    tasks.push(newTask);
    renderTable();
    selectedTask = newTask;
}