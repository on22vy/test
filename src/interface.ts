interface Tasks{
    description: String;
    completed: boolean;
}

interface Timer{
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    mode?: string;
    isPaused: boolean;
    [key: string]: string | number | boolean | undefined ;
}