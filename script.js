let timerContainer = document.querySelector("#timerContainer");

let circularProgressBar = document.querySelector("#circularProgressBar");
let progressValue = document.querySelector("#progressValue");

let buttonLeft = document.querySelector("#buttonLeft");
let buttonRight =  document.querySelector("#buttonRight");
let buttonLabel = document.querySelector("#buttonLabel");

let buttonContainer = document.querySelector("#buttonContainer");
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
let visualRingProgressColor = "#f51b1b";
let pulseAnimationChoice = "pulseWork";

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
    circularProgressBar.style.animationName = pulseAnimationChoice;
}

function pauseTimer()
{
    clearInterval(timerInterval);
    playButton.style.display = "block";
    pauseButton.style.display = "none";
    circularProgressBar.style.animationName = "none";
}


function updateVisualTimer() {
    if(currentTimerValue === 0)
    {
        pauseTimer();
        //add audio
    }

    progressValue.textContent = `${createStringNumber(currentTimerValue)}`;
    circularProgressBar.style.background = `conic-gradient(#616161 ${currentTimerValue * visualRingProgress}deg, ${visualRingProgressColor} 0deg)`;
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
    playButton.style.display = "block";
    pauseButton.style.display = "none";
    circularProgressBar.style.animationName = "none";
    updateVisualTimer();
    changeColorScheme();
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

function changeColorScheme()
{
    switch(currentTimerType)
    {
        case "work":
            timerContainer.style.boxShadow = "#f51b1b 0px 0px 24px 12px, #f51b1b 0px 4px 6px -1px, #f51b1b 0px 1px 0px inset";
            buttonLeft.style.backgroundColor = "#f51b1b";
            buttonRight.style.backgroundColor = "#f51b1b";
            buttonLabel.style.border = "0.1em solid #f51b1b";
            buttonContainer.style.backgroundColor = "#f51b1b";
            buttonContainer.style.border = "4px solid #f51b1b";
            visualRingProgressColor = "#f51b1b";
            pulseAnimationChoice = "pulseWork";
            break;
        case "shortBreak":
            timerContainer.style.boxShadow = "#00ffff 0px 0px 24px 12px, #00ffff 0px 4px 6px -1px, #00ffff 0px 1px 0px inset";
            buttonLeft.style.backgroundColor = "#00ffff";
            buttonRight.style.backgroundColor = "#00ffff";
            buttonLabel.style.border = "0.1em solid #00ffff";
            buttonContainer.style.backgroundColor = "#00ffff";
            buttonContainer.style.border = "4px solid #00ffff";
            visualRingProgressColor = "#00ffff";
            pulseAnimationChoice = "pulseShortBreak";
            break;
        case "longBreak":
            timerContainer.style.boxShadow = "#07eb10 0px 0px 24px 12px, #07eb10 0px 4px 6px -1px, #07eb10 0px 1px 0px inset";
            buttonLeft.style.backgroundColor = "#07eb10";
            buttonRight.style.backgroundColor = "#07eb10";
            buttonLabel.style.border = "0.1em solid #07eb10";
            buttonContainer.style.backgroundColor = "#07eb10";
            buttonContainer.style.border = "4px solid #07eb10";
            visualRingProgressColor = "#07eb10";
            pulseAnimationChoice = "pulseLongBreak";
            break;
        default:
            console.log("switch case didn't work... T-T");
    }
    resetTimer();
}
// **** execution ****
choseTimerMode();
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);