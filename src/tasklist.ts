import { taskInput, taskList } from "./dom-utils";

const tasks : Array<Tasks> = [];

//Add new task input to task list
function addTask() {
    const description = taskInput.value;
    if (description) {
        tasks.push({
            description,
            completed: false
        });
    }

    renderTasklist();

    // Scroll to the newly added task
    const newTaskElement = taskList.lastChild as HTMLElement;
        if (newTaskElement) {
            newTaskElement.scrollIntoView({ behavior: "smooth" });
        }

    
}


function renderTasklist() {

    //Render the list of tasks using the styles defined in the CSS files.
    taskList.innerHTML = '';
    tasks.forEach(task => {

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        const liEl = document.createElement('li');
        liEl.innerHTML = `${task.description}`;

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-check');

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');

        taskContainer.appendChild(liEl);
        taskContainer.appendChild(checkIcon);
        taskContainer.appendChild(trashIcon);

        taskList.appendChild(taskContainer);
        
        //Delete Task when the trask icon is clicked
        trashIcon.addEventListener('click', ()=>{
            deleteTask(task, taskContainer);// call the deleteTask function
        })

        //Ensuring that the CSS "completed-task" class is added to the task container and the "cross-out" class is added to the list item element when the task is initially rendered, if the task's "completed" property is true.
        //It means when adding new task, the completed tasks in the list will be still crossed out
        if (task.completed) {
            markCompletedTask(liEl, taskContainer);
        }

        //The CSS "completed-task" class is added to the task container and the "cross-out" class is added to the list item element when the checkmark icon is clicked
        checkIcon.addEventListener('click', ()=> {
            task.completed = !task.completed;
            markCompletedTask(liEl, taskContainer);
        })
    });

}

//Delete task from the list
function deleteTask(task: Tasks, taskContainer: HTMLDivElement) {
    // Add fall animation when a task is removed
    taskContainer.classList.add("fall");
    // Remove task container after animation is complete
    setTimeout(() => {
        taskList.removeChild(taskContainer); // Delete task from the list display
        const index = tasks.indexOf(task);
        tasks.splice(index, 1); // Remove deleted task from the tasks array
      }, 450); 
    
}

//Marking task as completed
function markCompletedTask(liEl: HTMLLIElement, taskContainer: HTMLDivElement) { 
    taskContainer.classList.toggle("completed-task");
    liEl.classList.toggle("cross-out");
}


export {addTask, renderTasklist}