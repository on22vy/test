import { addBtn, taskInput } from "./dom-utils";
import { addTask, renderTasklist } from "./tasklist";



function initApp(){
    renderTasklist();

    addBtn.addEventListener('click',()=>{
        addTask();
        renderTasklist();
        taskInput.value = '';
    });
    
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
            renderTasklist();
            taskInput.value = '';
        }
    });
}
   
initApp();
