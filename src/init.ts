import { addButton, modeButtons, resetButton, startButton, taskInput } from "./dom-utils";
import { playStartButtonSound, resetTimer, startCountdown, switchModeOnClick} from "./pomodoro";
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
        startCountdown();
        playStartButtonSound();
        
    });

    resetButton.addEventListener('click', resetTimer);
}

initApp();
