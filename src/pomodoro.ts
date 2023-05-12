import { backToWorkSound, breakSound, buttonSound, startButton, timerContainer } from "./dom-utils";

const timer: Timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
};

const min = document.getElementById('js-minutes') as HTMLElement;
const sec = document.getElementById('js-seconds') as HTMLElement;
let interval: ReturnType<typeof setTimeout>;
let paused = true;

function switchMode(event: Event) {
    const currentMode = (event.target as HTMLButtonElement).dataset.mode;
    if (!currentMode) {
      return;
    }

    resetTimer();
    //Switch button style
    const activeButton = document.querySelector(`button[data-mode="${currentMode}"]`) as HTMLButtonElement;
    const buttons = document.querySelectorAll('button[data-mode]');
    buttons.forEach(button => {
      if (button === activeButton) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

     //Switch background color
    timerContainer.style.backgroundColor = `var(--${currentMode})`;

    //Update Clock UI
    updateTimerDisplay(currentMode);

}



function resetTimer(){
    clearTimeout(interval);
    const activeButton = document.querySelector('button.active') as HTMLButtonElement;
    const activeMode = `${activeButton.dataset.mode}`;
    
    //Update Clock UI
    updateTimerDisplay(activeMode);
    paused = true;
    
}



function updateTimerDisplay(mode: string) {
    startButton.innerHTML = "Start";
    if(mode === "pomodoro"){
        if (min !== null) {
            min.innerHTML = `${timer.pomodoro}`.padStart(2, '0');
        }
    }else if (mode === "shortBreak"){
        if (min !== null) {
            min.innerHTML = `${timer.shortBreak}`.padStart(2, '0');
        }
    }else if (mode === "longBreak"){
        if (min !== null) {
            min.innerHTML = `${timer.longBreak}`.padStart(2, '0');
        }
    } 
    sec.innerHTML = "00";
}


  
function startCountdown() {
    clearTimeout(interval);
    if(paused) {
        paused = false;
        startButton.innerHTML = "Pause";
        let minutes = parseInt(min.innerHTML);
        let seconds = parseInt(sec.innerHTML);

        let endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + minutes); 
        endTime.setSeconds(endTime.getSeconds() + seconds);

        function countdown() {
            let now = new Date();
            let remainingTime = endTime.getTime() - now.getTime(); //in Miliseconds
            if (remainingTime <= 0) {
                const activeButton = document.querySelector('button.active') as HTMLButtonElement;
                const activeMode = `${activeButton.dataset.mode}`;
                playEndTimerSound(activeMode);
                // Handle when timer ends
                min.innerHTML = '00';
                sec.innerHTML = '00';
                resetTimer();

            } else {
                let remainingSeconds = Math.round(remainingTime / 1000);
                minutes = Math.floor(remainingSeconds / 60);
                seconds = remainingSeconds % 60;
                if (min !== null) {
                    min.innerHTML = `${minutes}`.padStart(2, '0');
                }
                if (sec !== null) {
                    sec.innerHTML = `${seconds}`.padStart(2, '0');
                }
                interval = setTimeout(countdown, 1000);
            }
        }
        interval = setTimeout(countdown, 1000);
    }else {
        startButton.innerHTML = "Resume";
        paused = true;
        clearTimeout(interval);
    }
}

function playEndTimerSound(mode:String){
    if (mode === "pomodoro") {
    breakSound.play();
    } else if (mode === "shortBreak") {
    backToWorkSound.play();
    } else if (mode === "longBreak") {
    backToWorkSound.play();
    }
}

function playStartButtonSound(){
     buttonSound.play();
}

export{startCountdown, switchMode, resetTimer, playStartButtonSound, playEndTimerSound}