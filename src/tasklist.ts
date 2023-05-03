import { taskInput, taskList } from "./dom-utils";

const tasks : Array<Tasks> = [];

function addTask() {
    const beschreibung = taskInput.value;
    if (beschreibung) {
        tasks.push({
            beschreibung,
        });
    }
}

function renderTasklist() {
    taskList.innerHTML = '';

    tasks.forEach(task => {

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        const colorTag = document.createElement('div');
        colorTag.classList.add('color-tag');

        const liEl = document.createElement('li');
        liEl.innerHTML = `${task.beschreibung}`;

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-check');

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');

        taskContainer.appendChild(colorTag);
        taskContainer.appendChild(liEl);
        taskContainer.appendChild(checkIcon);
        taskContainer.appendChild(trashIcon);

        taskList.appendChild(taskContainer);
    });
}

export {addTask, renderTasklist}