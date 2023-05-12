import { addButton, modeButtons, resetButton, startButton, taskInput } from "./dom-utils";
import { controlTimer, playStartButtonSound, resetTimer, switchModeOnClick} from "./pomodoro";
import { addTask, renderTasklist } from "./tasklist";

function initApp(){
    renderTasklist();

    addButton.addEventListener('click',()=>{
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

    modeButtons.addEventListener('click', switchModeOnClick);

    startButton.addEventListener('click', ()=>{
        controlTimer();
        playStartButtonSound();
        
    });

    resetButton.addEventListener('click', resetTimer);
}

initApp();
