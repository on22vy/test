(function () {
    'use strict';

    const taskList = document.querySelector('.task-list');
    const taskInput = document.querySelector('.task-input');
    const addButton = document.querySelector('.add-btn');
    const modeButtons = document.querySelector('#js-mode-buttons');
    const timerContainer = document.querySelector('.timer');
    const minutesElement = document.getElementById('js-minutes');
    const secondsElement = document.getElementById('js-seconds');
    const startButton = document.querySelector('.start-button');
    const resetButton = document.querySelector('.reset-btn');
    const buttonSound = document.querySelector('#start-button-sound');
    const breakSound = document.querySelector("#break-sound");
    const backToWorkSound = document.querySelector("#back-to-work-sound");
    const tomatoIconsContainer = document.querySelector('.tomato-icons-container');

    // Initialize the timer object with initial values
    const timer = {
        pomodoro: 1,
        shortBreak: 5,
        longBreak: 15,
        isPaused: true
    };
    // Perform actions when the DOM has finished loading
    document.addEventListener('DOMContentLoaded', () => {
        // Let's check if the browser supports notifications
        if ('Notification' in window) {
            // If notification permissions have neither been granted or denied
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                // ask the user for permission
                Notification.requestPermission().then(function (permission) {
                    // If permission is granted
                    if (permission === 'granted') {
                        // Create a new notification
                        new Notification('Awesome! You will be notified at the start of each session');
                    }
                });
            }
        }
        // Switch the mode to 'pomodoro' initially
        switchModeTo('pomodoro');
    });
    // Function to switch the timer mode
    function switchModeTo(mode) {
        const buttons = document.querySelectorAll('button[data-mode]');
        // Iterate through the buttons and update their active states
        buttons.forEach(button => {
            const targetButton = button;
            if (targetButton.dataset.mode === mode) {
                targetButton.classList.add('active');
            }
            else {
                targetButton.classList.remove('active');
            }
        });
        // Switch background color based on the mode
        timerContainer.style.backgroundColor = `var(--${mode})`;
        // Update the Clock UI
        updateClock(mode);
    }
    // Function to handle the click event on mode buttons
    function switchModeOnClick(event) {
        const clickedButton = event.target;
        // Do nothing if the clicked element is not a mode button
        if (!clickedButton.classList.contains('mode-button')) {
            return;
        }
        // Get the clicked mode and switch to that mode
        const clickedMode = `${clickedButton.dataset.mode}`;
        switchModeTo(clickedMode);
        // Reset the timer
        resetTimer();
    }
    // Function to retrieve the active mode
    function getActiveMode() {
        const activeButton = document.querySelector('button.active');
        const activeMode = `${activeButton.dataset.mode}`;
        return activeMode;
    }
    // Function to reset the timer
    function resetTimer() {
        clearTimeout(countdownInterval);
        const activeMode = getActiveMode();
        //Update Clock UI
        updateClock(activeMode);
        // Set the timer to paused state
        timer.isPaused = true;
    }
    // Function to update the clock UI
    function updateClock(mode) {
        startButton.innerHTML = "Start";
        if (minutesElement !== null) {
            minutesElement.innerHTML = `${timer[mode]}`.padStart(2, '0');
        }
        secondsElement.innerHTML = "00";
    }
    // Variable to hold the countdown interval
    let countdownInterval;
    // Variable to keep track of completed pomodoros
    let completedPomodoros = 0;
    // Function to start, pause or resume timer
    function controlTimer() {
        clearTimeout(countdownInterval);
        if (timer.isPaused) {
            // If the timer is paused, start/resume it
            timer.isPaused = false;
            startButton.innerHTML = "Pause";
            let minutes = parseInt(minutesElement.innerHTML);
            let seconds = parseInt(secondsElement.innerHTML);
            let endTime = new Date();
            endTime.setMinutes(endTime.getMinutes() + minutes);
            endTime.setSeconds(endTime.getSeconds() + seconds);
            // Function to perform the countdown
            function countdown() {
                let now = new Date();
                let remainingTime = endTime.getTime() - now.getTime(); //in Miliseconds
                if (remainingTime <= 0) {
                    // Handle when timer ends
                    // Get the active mode
                    const activeMode = getActiveMode();
                    //Play the sound when the timer ends based on the active mode
                    playEndTimerSound(activeMode);
                    if (activeMode === 'pomodoro') {
                        // Increment the count of completed pomodoros
                        completedPomodoros++;
                        // Create a new tomato icon to track the completed pomodoro
                        const tomatoIcon = document.createElement('img');
                        tomatoIcon.src = '/images/tomato-icon.png';
                        tomatoIcon.classList.add('tomato-icon');
                        tomatoIconsContainer.appendChild(tomatoIcon);
                        if (completedPomodoros === 4) {
                            // Switch to long break mode after completing 4 pomodoros
                            switchModeTo('longBreak');
                            showNotification('longBreak');
                            resetTimer();
                            controlTimer();
                        }
                        else {
                            // Switch to short break mode
                            switchModeTo('shortBreak');
                            showNotification('shortBreak');
                            resetTimer();
                            controlTimer();
                        }
                    }
                    else if (activeMode === 'longBreak') {
                        // Refresh tomato icons container and switch back to pomodoro mode
                        tomatoIconsContainer.innerHTML = '';
                        switchModeTo('pomodoro');
                        showNotification('pomodoro');
                        resetTimer();
                    }
                    else {
                        // Switch back to pomodoro mode
                        switchModeTo('pomodoro');
                        showNotification('pomodoro');
                        resetTimer();
                        controlTimer();
                    }
                }
                else {
                    // Handle while timer is running
                    // Calculate remaining time
                    let remainingSeconds = Math.ceil(remainingTime / 1000);
                    minutes = Math.floor(remainingSeconds / 60);
                    seconds = remainingSeconds % 60;
                    // Update the minutes and seconds on the UI
                    if (minutesElement !== null) {
                        minutesElement.innerHTML = `${minutes}`.padStart(2, '0');
                    }
                    if (secondsElement !== null) {
                        secondsElement.innerHTML = `${seconds}`.padStart(2, '0');
                    }
                    // Continue the countdown
                    countdownInterval = setTimeout(countdown, 1000);
                }
            }
            // Start the initial countdown
            countdown();
        }
        else {
            // If the timer is running, pause it
            timer.isPaused = true;
            startButton.innerHTML = "Resume";
            clearTimeout(countdownInterval);
        }
    }
    // Function to show notification based on the mode
    function showNotification(mode) {
        if (Notification.permission === 'granted') {
            let notificationText = '';
            if (mode === 'pomodoro') {
                notificationText = 'Get back to work!';
            }
            else if (mode === 'shortBreak') {
                notificationText = 'Take a break!';
            }
            else if (mode === 'longBreak') {
                notificationText = "👏👏👏 Good job! Now let's take a longggg break";
            }
            if (notificationText !== '') {
                new Notification(notificationText);
            }
        }
    }
    //Function to play sound effect based on the mode
    function playEndTimerSound(mode) {
        if (mode === "pomodoro") {
            breakSound.play();
        }
        else if (mode === "shortBreak") {
            backToWorkSound.play();
        }
        else if (mode === "longBreak") {
            backToWorkSound.play();
        }
    }
    //Function to play start button sound effect
    function playStartButtonSound() {
        buttonSound.play();
    }

    const tasks = [];
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
        const newTaskElement = taskList.lastChild;
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
            trashIcon.addEventListener('click', () => {
                deleteTask(task, taskContainer); // call the deleteTask function
            });
            //Ensuring that the CSS "completed-task" class is added to the task container and the "cross-out" class is added to the list item element when the task is initially rendered, if the task's "completed" property is true.
            //It means when adding new task, the completed tasks in the list will be still crossed out
            if (task.completed) {
                markCompletedTask(liEl, taskContainer);
            }
            //The CSS "completed-task" class is added to the task container and the "cross-out" class is added to the list item element when the checkmark icon is clicked
            checkIcon.addEventListener('click', () => {
                task.completed = !task.completed;
                markCompletedTask(liEl, taskContainer);
            });
        });
    }
    //Delete task from the list
    function deleteTask(task, taskContainer) {
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
    function markCompletedTask(liEl, taskContainer) {
        taskContainer.classList.toggle("completed-task");
        liEl.classList.toggle("cross-out");
    }

    function initApp() {
        renderTasklist();
        addButton.addEventListener('click', () => {
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
        startButton.addEventListener('click', () => {
            controlTimer();
            playStartButtonSound();
        });
        resetButton.addEventListener('click', resetTimer);
    }
    initApp();

})();
