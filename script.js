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
        /* rewrite this segment with append child */
        
        //create elements
        let divclass_checkButton = document.createElement('div')
        let svgCheckButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let pathCheckButton = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let divclass_taskText = document.createElement('div')
        let divclass_removeButton = document.createElement('div')
        let svgremoveButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let pathremoveButton = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        //append elementss
        li.appendChild(divclass_checkButton);
        divclass_checkButton.appendChild(svgCheckButton);
        svgCheckButton.appendChild(pathCheckButton);
        li.appendChild(divclass_taskText);
        li.appendChild(divclass_removeButton);
        divclass_removeButton.appendChild(svgremoveButton);
        svgremoveButton.appendChild(pathremoveButton);
        

        // asign classes
        divclass_checkButton.classList.add("checkListItemButton");
        divclass_taskText.classList.add("taskText");
        divclass_removeButton.classList.add("removeListItemButton");

        svgremoveButton.classList.add("removeListItemButton");
        pathremoveButton.classList.add("removeListItemButton");

        // change attributes and text
        // svgCheckButton.setAttribute('style', 'width:24px;height:24px');
        svgCheckButton.setAttribute('viewBox', '0 0 24 24');
        // pathCheckButton.setAttribute('fill', 'currentColor');
        pathCheckButton.setAttribute('d', 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
        divclass_taskText.textContent = todoInputField.value;
        // svgremoveButton.setAttribute('style', 'width:24px;height:24px');
        svgremoveButton.setAttribute('viewBox', '0 0 24 24');
        // pathremoveButton.setAttribute('fill', 'currentColor');
        pathremoveButton.setAttribute('d', 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z');

        

        
        
        

        
        
        /*li.innerHTML = `
        <svg class="listItemButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
        <!-- <span class="checkmark"></span> -->
        ${todoInputField.value}
        <svg class="listItemRemove"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
        `;*/
        listContainer.appendChild(li);
        todoInputField.value = '';

        li.style.backgroundColor = listItemColor;
        completeTask(divclass_checkButton, divclass_taskText, pathCheckButton);
        RemoveTask(divclass_removeButton);
    }
}
function completeTask(checkButton, text, svgPath)
{
    checkButton.addEventListener('click', () => {
        console.log('bye');
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
function RemoveTask(removeButton)
{
    removeButton.addEventListener('click', () => {
        console.log('hi');
        removeButton.parentElement.remove();
    })
    // listContainer.addEventListener('click', function(e){
    //     console.log(e.target);
    //     if(e.target.tagName === "SVG")
    //     {
    //         e.target.classList.toggle("checked");
    //         // e.target.parentElement.classList.toggle("checked");
    //     }
    //     else if(e.target.className === "removeListItemButton")
    //     {
    //         e.target.parentElement.remove();
    //     }
    // }, false);
}
// **** execution ****
choseTimerMode();
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
todoInputButton.addEventListener('click', addTask);
todoInputField.addEventListener('keypress', function(event){
    if(event.key === "Enter")
    {
        event.preventDefault();
        addTask();
    }
});

// completeOrRemoveTask();