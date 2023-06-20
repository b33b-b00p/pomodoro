let circularProgressBar = document.querySelector("#circularProgressBar"); //ring
let progressValue = document.querySelector("#progressValue");

let buttonLeft = document.querySelector("#buttonLeft");
let buttonRight =  document.querySelector("#buttonRight");
let buttonLabel = document.querySelector("#buttonLabel");

let playButton = document.querySelector('#playButton');
let pauseButton = document.querySelector('#pauseButton');
let resetButton = document.querySelector('#resetButton');

//add audio

// **** timer values ****
let workTime = 1500; // 25min
let shortBreakTime = 300; // 5min
let longBreakTime = 900; // 15min

let timerInterval;
let currentTimerType = "work"
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

function choseTimerMode() 
{
    // console.log('before click type');
    // console.log(currentTimerType);
    buttonLeft.addEventListener('click', () => {
        switch(currentTimerType)
        {
            case "work":
                currentTimerType = "longBreak";
                buttonLabel.innerHTML = "long_break";
                break;
            case "shortBreak":
                currentTimerType = "work";
                buttonLabel.innerHTML = "work";
                break;
            case "longBreak":
                currentTimerType = "shortBreak";
                buttonLabel.innerHTML = "short_break";
                break;
            default:
                console.log("switch case didn't work... T-T");
        }
        resetTimer();
    });
    buttonRight.addEventListener('click', () => {
        switch(currentTimerType)
        {
            case "work":
                currentTimerType = "shortBreak";
                buttonLabel.innerHTML = "short_break";
                break;
            case "shortBreak":
                currentTimerType = "longBreak";
                buttonLabel.innerHTML = "long_break";
                break;
            case "longBreak":
                currentTimerType = "work";
                buttonLabel.innerHTML = "work";
                break;
            default:
                console.log("switch case didn't work... T-T");
        }
        resetTimer();
    });
}

// **** execution ****
choseTimerMode();
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);