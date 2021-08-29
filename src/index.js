import {isNotEmpty, 
    serializeData, desializeData} from "./utils";


 function IndexVM() {
    var that = this;

    that.tasks = [];
    that.outputTblBody = document.getElementById("outputTblBody");
    that.editOrView = document.getElementById("editOrView");
    that.taskEdit = document.getElementById("taskEdit");
    that.doneEdit = document.getElementById("doneEdit");
    that.updateBtn = document.getElementById("updateBtn");
    that.selectedTask = {};
    that.deletTaskElm = document.getElementById("deleteTask");
    that.addBtn = document.getElementById("addBtn");
    that.todoTxt = document.getElementById("todoTxt");
    that.errorFeedback = document.getElementById("errorFeedback");
    that.desializeData = desializeData;

    that.addBtn.onclick = function(event) {
        event.preventDefault();
        that.errorFeedback.innerText = "";
        that.errorFeedback.style.display = "none";

        let todoVal = that.todoTxt.value;
        that.todoTxt.style.border = "";

        //validate
        if(!isNotEmpty(todoVal)) {
            that.errorFeedback.innerText = "Task description is required";
            that.errorFeedback.style.display = "block";
            that.todoTxt.style.border = "1px solid red";
            return;
        }

        //prepare the data
        const task = {
            description: todoVal,
            done: false
        }

        that.tasks.push(task);

        that.renderTable();
        
        //clear control
        that.todoTxt.value = "";

    }

    that.renderTable = () => {
        const tableBody = that.tasksToRows(that.tasks);
        that.outputTblBody.innerHTML = tableBody.join("");
    }

    that.rowStroke = (task) => {
        return task.done?"text-decoration: line-through;": "";
    }
    that.tasksToRows = (_tasks) => {
        return _tasks.map(t => {
            return `<tr style="${that.rowStroke(t)}"><td>${t.description}</td><td><a data-task="${serializeData(t)}" href="#" id="viewTask" onClick="that.editOrViewTask(this.dataset.task)">Edit/View</a> 
            <a href="#" style="color: red" data-task="${serializeData(t)}" onClick="event.preventDefault(); that.deleteTask(this.dataset.task)">Delete</a></td></tr>`;
        });
    }

    that.editOrViewTask = _task => {
        const task = desializeData(_task);
        that.selectedTask = task;
        that.editOrView.style.display = "block";
        that.taskEdit.value = task.description;
        that.doneEdit.checked = task.done;
    }
    that.deleteTask = _task => {
        const task = that.desializeData(_task);
        that.tasks = that.tasks.filter(t => !(t.description === task.description && t.done === task.done ) );
        that.renderTable();
    }
    that.updateBtn.onclick =  function(event) {
        event.preventDefault();
        const taskEditValue = that.taskEdit.value;
        const done = that.doneEdit.checked;
        const newTask = {description: taskEditValue, done};
    
        //hmm duplicate
        const errorFeedbackView = document.getElementById("errorFeedbackView");
        errorFeedbackView.innerText = "";
        errorFeedbackView.style.display = "none";
    
        that.taskEdit.style.border = "";
    
        //validate
        if(!isNotEmpty(newTask.description)) {
            errorFeedbackView.innerText = "Task description is required";
            errorFeedbackView.style.display = "block";
            taskEdit.style.border = "1px solid red";
            return;
        }
    
        that.tasks = that.tasks.filter(t => !(t.description === that.selectedTask.description && t.done === that.selectedTask.done ) );
        that.tasks.push(newTask);
        that.renderTable();
        that.selectedTask = newTask;
    }
 }   

(function(){
    window.that = new IndexVM();
})()