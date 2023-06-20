let circularProgressBar = document.querySelector("#circularProgressBar"); //ring
let progressValue = document.querySelector("#progressValue");
let workLabel = document.querySelector("#workLabel");
let shortBreakLabel = document.querySelector("#shortBreakLabel");
let longBreakLabel = document.querySelector("#longBreakLabel");
let playButton = document.querySelector('#playButton');
let pauseButton = document.querySelector('#pauseButton');
let resetButton = document.querySelector('#resetButton');

//add audio

// **** timer values ****
let workTime = 1500; // 25min
let shortBreakTime = 300; // 5min
let longBreakTime = 900; // 15min
let timerType_work = 'work';
let timerType_shortBreak = 'shortBreak';
let timerType_longBreak = 'longBreak';

let timerInterval;
let currentTimerType = timerType_work;
let currentTimerValue = workTime;
let visualRingProgress = 360 / currentTimerValue;

// **** timer functions ****
function createStringNumber(number) 
{
    let minutes = Math.trunc(number / 60).toString().padStart(2, "0");
    let seconds = Math.trunc(number % 60).toString().padStart(2, "0");

    return `${minutes}: ${seconds}`;
}

function decrementTimer()
{
    currentTimerValue--;
    updateVisualTimer();
    // console.log('helo');
}

function startTimer() 
{
    timerInterval = setInterval(decrementTimer, 1000);
    playButton.style.display = "none";
    pauseButton.style.display = "block";
}

function pauseTimer()
{
    clearInterval(timerInterval);
    playButton.style.display = "block";
    pauseButton.style.display = "none";
}


function updateVisualTimer() {
    if(currentTimerValue === 0)
    {
        pauseTimer();
        //add audio
    }

    progressValue.textContent = `${createStringNumber(currentTimerValue)}`;
    circularProgressBar.style.background = `conic-gradient(yellow ${currentTimerValue * visualRingProgress}deg, red 0deg)`;
}

function resetTimer() 
{
    clearInterval(timerInterval);

    switch(currentTimerType)
    {
        case "work":
            currentTimerValue = workTime;
            break;
        case "shortBreak":
            currentTimerValue = shortBreakTime;
            break;
        case "longBreak":
            currentTimerValue = longBreakTime;
            break;
        default:
            console.log("switch case didn't work... T-T");
    }
    
    visualRingProgress = 360 / currentTimerValue;
    updateVisualTimer();
    playButton.style.display = "block";
    pauseButton.style.display = "none";
    //stop audio
}

function lightTheLabel() 
{
    // console.log('before click type');
    // console.log(currentTimerType);
    workLabel.addEventListener('click', () => {
        currentTimerType = "work";
        // console.log('after click type');
        // console.log(currentTimerType);
        resetTimer();
    });
    shortBreakLabel.addEventListener('click', () => {
        currentTimerType = "shortBreak";
        // console.log('after click type');
        // console.log(currentTimerType);
        resetTimer();
    });
    longBreakLabel.addEventListener('click', () => {
        currentTimerType = "longBreak";
        // console.log('after click type');
        // console.log(currentTimerType);
        resetTimer();
    });
}

// **** execution ****
lightTheLabel();
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);