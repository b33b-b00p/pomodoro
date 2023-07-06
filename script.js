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

let logo = document.querySelector("#logo");


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
}

function startTimer() 
{
    if(currentTimerValue === 0)
    {
        resetTimer();
    }
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
}

function choseTimerMode() 
{
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
            //timer
            timerContainer.style.boxShadow = "#f51b1b 0px 0px 24px 12px, #f51b1b 0px 4px 6px -1px, #f51b1b 0px 1px 0px inset";
            buttonLeft.style.backgroundColor = "#f51b1b";
            buttonRight.style.backgroundColor = "#f51b1b";
            buttonLabel.style.border = "0.1em solid #f51b1b";
            buttonContainer.style.backgroundColor = "#f51b1b";
            buttonContainer.style.border = "4px solid #f51b1b";
            visualRingProgressColor = "#f51b1b";
            pulseAnimationChoice = "pulseWork";
            //todo list
            todoContainer.style.boxShadow = "#f51b1b 0px 0px 24px 12px, #f51b1b 0px 4px 6px -1px, #f51b1b 0px 1px 0px inset";
            todoInputField.style.border = "0.1em solid #f51b1b";
            todoInputButton.style.backgroundColor = "#f51b1b";
            listItemColor = "#f51b1b";
            listContainer.querySelectorAll('.listItem').forEach(item => {
                item.style.backgroundColor = "#f51b1b";
            }); 
            //header 
            logo.style.color = "#f51b1b";
            openSettingsButton.querySelector("svg").style.boxShadow = "#f51b1b 0px 0px 7px 6px, #f51b1b 0px 4px 6px -1px, #f51b1b 0px 1px 0px inset";
            openSettingsButton.querySelector("svg").style.backgroundColor = "#f51b1b";
            //window settings
            confirmButton.style.backgroundColor = "#f51b1b";
            closeSettingsButton.querySelector("svg").style.fill = "#f51b1b";
            break;
        case "shortBreak":
            //timer
            timerContainer.style.boxShadow = "#00ffff 0px 0px 24px 12px, #00ffff 0px 4px 6px -1px, #00ffff 0px 1px 0px inset";
            buttonLeft.style.backgroundColor = "#00ffff";
            buttonRight.style.backgroundColor = "#00ffff";
            buttonLabel.style.border = "0.1em solid #00ffff";
            buttonContainer.style.backgroundColor = "#00ffff";
            buttonContainer.style.border = "4px solid #00ffff";
            visualRingProgressColor = "#00ffff";
            pulseAnimationChoice = "pulseShortBreak";
            //todo list
            todoContainer.style.boxShadow = "#00ffff 0px 0px 24px 12px, #00ffff 0px 4px 6px -1px, #00ffff 0px 1px 0px inset";
            todoInputField.style.border = "0.1em solid #00ffff";
            todoInputButton.style.backgroundColor = "#00ffff";
            listItemColor = "#00ffff";
            listContainer.querySelectorAll('.listItem').forEach(item => {
                item.style.backgroundColor = "#00ffff";
            }); 
            //header 
            logo.style.color = "#00ffff";
            openSettingsButton.querySelector("svg").style.boxShadow = "#00ffff 0px 0px 7px 6px, #00ffff 0px 4px 6px -1px, #00ffff 0px 1px 0px inset";
            openSettingsButton.querySelector("svg").style.backgroundColor = "#00ffff";
            //window settings
            confirmButton.style.backgroundColor = "#00ffff";
            closeSettingsButton.querySelector("svg").style.fill = "#00ffff";
            break;
        case "longBreak":
            //timer
            timerContainer.style.boxShadow = "#07eb10 0px 0px 24px 12px, #07eb10 0px 4px 6px -1px, #07eb10 0px 1px 0px inset";
            buttonLeft.style.backgroundColor = "#07eb10";
            buttonRight.style.backgroundColor = "#07eb10";
            buttonLabel.style.border = "0.1em solid #07eb10";
            buttonContainer.style.backgroundColor = "#07eb10";
            buttonContainer.style.border = "4px solid #07eb10";
            visualRingProgressColor = "#07eb10";
            pulseAnimationChoice = "pulseLongBreak";
            //todo list
            todoContainer.style.boxShadow = "#07eb10 0px 0px 24px 12px, #07eb10 0px 4px 6px -1px, #07eb10 0px 1px 0px inset";
            todoInputField.style.border = "0.1em solid #07eb10";
            todoInputButton.style.backgroundColor = "#07eb10";
            listItemColor = "#07eb10";
            listContainer.querySelectorAll('.listItem').forEach(item => {
                item.style.backgroundColor = "#07eb10";
            }); 
            //header 
            logo.style.color = "#07eb10";
            openSettingsButton.querySelector("svg").style.boxShadow = "#07eb10 0px 0px 7px 6px, #07eb10 0px 4px 6px -1px, #07eb10 0px 1px 0px inset";
            openSettingsButton.querySelector("svg").style.backgroundColor = "#07eb10";
            //window settings
            confirmButton.style.backgroundColor = "#07eb10";
            closeSettingsButton.querySelector("svg").style.fill = "#07eb10";
            break;
        default:
            console.log("switch case didn't work... T-T");
    }
    resetTimer();
}

// **** todo list ****
let todoContainer = document.querySelector("#todoContainer");
let todoList = document.querySelector("#todoList");
let todoInputPanel = document.querySelector("#todoInputPanel");
let todoInputField = document.querySelector("#todoInputField");
let todoInputButton = document.querySelector("#todoInputButton");
let listContainer = document.querySelector("#listContainer");

let listItemColor = "#f51b1b";

function addTask()
{
    if(todoInputField.value === '')
    {
        alert("write something");
    }
    else
    {
        let li = document.createElement("li");
        li.classList.add("listItem");
        
        //create elements
        let divclass_checkButton = document.createElement('div')
        let svgCheckButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let pathCheckButton = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let inputclass_taskText = document.createElement('input')
        let divclass_removeButton = document.createElement('div')
        let svgremoveButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let pathremoveButton = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        //append elementss
        li.appendChild(divclass_checkButton);
        divclass_checkButton.appendChild(svgCheckButton);
        svgCheckButton.appendChild(pathCheckButton);
        li.appendChild(inputclass_taskText);
        li.appendChild(divclass_removeButton);
        divclass_removeButton.appendChild(svgremoveButton);
        svgremoveButton.appendChild(pathremoveButton);
        

        // asign classes
        divclass_checkButton.classList.add("checkListItemButton");
        inputclass_taskText.classList.add("taskText");
        divclass_removeButton.classList.add("removeListItemButton");

        svgremoveButton.classList.add("removeListItemButton");
        pathremoveButton.classList.add("removeListItemButton");

        // change attributes and text
        svgCheckButton.setAttribute('viewBox', '0 0 24 24');
        pathCheckButton.setAttribute('d', 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
        inputclass_taskText.value = todoInputField.value;
        inputclass_taskText.type = "text";
        inputclass_taskText.setAttribute("spellcheck", "false");
        svgremoveButton.setAttribute('viewBox', '0 0 24 24');
        pathremoveButton.setAttribute('d', 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z');

        listContainer.appendChild(li);
        todoInputField.value = '';

        li.style.backgroundColor = listItemColor;
        completeTask(divclass_checkButton, inputclass_taskText, pathCheckButton);
        removeTask(divclass_removeButton);
    }
}
function completeTask(checkButton, text, svgPath)
{
    checkButton.addEventListener('click', () => {
        // console.log('bye');
        text.classList.toggle("checked");
        updateSVG(text, svgPath);
    })
}
function updateSVG(textElement, path)
{
    if(textElement.classList.contains('checked'))
    {
        path.setAttribute('d', 'M12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z');
    }
    else
    {
        path.setAttribute('d', 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
    }
}
function removeTask(removeButton)
{
    removeButton.addEventListener('click', () => {
        // console.log('hi');
        removeButton.parentElement.remove();
    })
}
// **** settings window ****
let openSettingsButton = document.querySelector("#settingsButton");
let closeSettingsButton = document.querySelector("#closeFormButton");
let settingsBg = document.querySelector("#settingsBg");
let workTimeContainer = document.querySelector("#workTimeContainer");
let shortBreakContainer = document.querySelector("#shortBreakContainer");
let longBreakContainer = document.querySelector("#longBreakContainer");
let confirmButton = document.querySelector("#confirmButton");
let new_workTime = workTime;
let new_shortBreakTime = shortBreakTime;
let new_longBreakTime = longBreakTime;

function openSettings()
{
    openSettingsButton.querySelector("svg").style.transform = 'rotate(-70deg)';
    setTimeout(() => {
        settingsBg.style.display = 'flex';
        
    }, 300);
}
function closeSettings()
{
    settingsBg.style.display = 'none';
    openSettingsButton.querySelector("svg").style.transform = 'rotate(0deg)';
}

function changeWorkTime()
{
    workTimeContainer.querySelector(".decrementTimeButton").addEventListener('click', () => {
        if(new_workTime >= 300 && new_workTime <= 5400)
        {
            new_workTime -= 300;
            if(new_workTime < 300)
            {
                new_workTime = 300;
            }
        }
        workTimeContainer.querySelector("#workTimeButtonLabel").innerText = new_workTime / 60;
    });
    workTimeContainer.querySelector(".incrementTimeButton").addEventListener('click', () => {
        if(new_workTime >= 300 && new_workTime <= 5400)
        {
            new_workTime += 300;
            if(new_workTime > 5400)
            {
                new_workTime = 5400;
            }
        }
        workTimeContainer.querySelector("#workTimeButtonLabel").innerText = new_workTime / 60;
    });
}
function changeShortBreakTime()
{
    shortBreakContainer.querySelector(".decrementTimeButton").addEventListener('click', () => {
        if(new_shortBreakTime >= 300 && new_shortBreakTime <= 5400)
        {
            new_shortBreakTime -= 300;
            if(new_shortBreakTime < 300)
            {
                new_shortBreakTime = 300;
            }
        }
        shortBreakContainer.querySelector("#shortBreakButtonLabel").innerText = new_shortBreakTime / 60;
    });
    shortBreakContainer.querySelector(".incrementTimeButton").addEventListener('click', () => {
        if(new_shortBreakTime >= 300 && new_shortBreakTime <= 5400)
        {
            new_shortBreakTime += 300;
            if(new_shortBreakTime > 5400)
            {
                new_shortBreakTime = 5400;
            }
        }
        shortBreakContainer.querySelector("#shortBreakButtonLabel").innerText = new_shortBreakTime / 60;
    });
}
function changeLongBreakTime()
{
    longBreakContainer.querySelector(".decrementTimeButton").addEventListener('click', () => {
        if(new_longBreakTime >= 300 && new_longBreakTime <= 5400)
        {
            new_longBreakTime -= 300;
            if(new_longBreakTime < 300)
            {
                new_longBreakTime = 300;
            }
        }
        longBreakContainer.querySelector("#longBreakButtonLabel").innerText = new_longBreakTime / 60;
    });
    longBreakContainer.querySelector(".incrementTimeButton").addEventListener('click', () => {
        if(new_longBreakTime >= 300 && new_longBreakTime <= 5400)
        {
            new_longBreakTime += 300;
            if(new_longBreakTime > 5400)
            {
                new_longBreakTime = 5400;
            }
        }
        longBreakContainer.querySelector("#longBreakButtonLabel").innerText = new_longBreakTime / 60;
    });
}

function confirmTimerSettings()
{
    workTime = new_workTime;
    shortBreakTime = new_shortBreakTime;
    longBreakTime = new_longBreakTime;
    resetTimer();
}
// **** execution ****
choseTimerMode();
changeWorkTime();
changeShortBreakTime();
changeLongBreakTime();
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
todoInputButton.addEventListener('click', addTask);
openSettingsButton.addEventListener('click', openSettings);
closeSettingsButton.addEventListener('click', closeSettings);
confirmButton.addEventListener('click', confirmTimerSettings);
confirmButton.addEventListener('click', closeSettings);
todoInputField.addEventListener('keypress', function(event){
    if(event.key === "Enter")
    {
        event.preventDefault();
        addTask();
    }
});