const taskList = document.querySelector('.task-list') as HTMLUListElement;
const taskInput = document.querySelector('.task-input') as HTMLInputElement;
const addButton = document.querySelector('.add-btn') as HTMLImageElement;
const modeButtons = document.querySelector('#js-mode-buttons') as HTMLDivElement;
const timerContainer = document.querySelector('.timer') as HTMLDivElement;
const minutesElement = document.getElementById('js-minutes') as HTMLElement;
const secondsElement = document.getElementById('js-seconds') as HTMLElement;
const startButton = document.querySelector('.start-button') as HTMLButtonElement;
const resetButton = document.querySelector('.reset-btn') as HTMLImageElement;
const buttonSound = document.querySelector('#start-button-sound') as HTMLAudioElement;
const breakSound = document.querySelector("#break-sound") as HTMLAudioElement;
const backToWorkSound = document.querySelector("#back-to-work-sound") as HTMLAudioElement;
const tomatoIconsContainer = document.querySelector('.tomato-icons-container') as HTMLDivElement;

export{taskList, taskInput, modeButtons, timerContainer, addButton, startButton, resetButton, buttonSound, breakSound, backToWorkSound, minutesElement, secondsElement, tomatoIconsContainer }