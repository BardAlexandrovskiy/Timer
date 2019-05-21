const buttonStart = document.querySelector('#start');
const buttonPause = document.querySelector('#pause');
const buttonStop = document.querySelector('#stop');
const buttonX1 = document.querySelector('#x1_speed');
const buttonX2 = document.querySelector('#x2_speed');
const buttonX3 = document.querySelector('#x3_speed');
const screen = document.querySelector('#screen');
const buttonCreateNum = document.querySelector('#button_create_num');
const inputCreateNum = document.querySelector('#input_create_num');
const buttonSound = document.querySelector('#sound_toggle');

const teak = new Audio();
teak.src = './audio/teak.mp3';
const intervalTime = 1000;
const startScreen = '00:00:00';
let timerOn = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;
let speedFactor = 1;
let squaresAmount;
let timerCounterNum = 0;
let timerСounterReverse = 0;
let soundOf = false;

screen.innerText = startScreen;

function counter() {
    const speed = intervalTime / speedFactor;
    const numTimer = document.querySelectorAll('.square_el');
    intervalId = setInterval(() => {
        if (numTimer !== undefined) {
            if (timerCounterNum < squaresAmount) {
                const square = numTimer[timerCounterNum].style;
                square.backgroundColor = 'lightgreen';
                square.color = 'black'
                timerCounterNum += 1;
                timerСounterReverse += 1;
            } else if (timerСounterReverse > 0) {
                timerСounterReverse -= 1;
                const square = numTimer[timerСounterReverse];
                square.style.backgroundColor = 'darkslateblue';
                square.style.color = 'white';
                if (timerСounterReverse === 0) {
                    timerCounterNum = 0;
                }
            }
        }
        if (seconds < 60) {
            seconds += 1;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes += 1;
        }
        if (minutes === 60) {
            minutes = 0;
            hours += 1;
        }
        if (hours >= 100) {
            alert('Это слишком!');
            stop();
        }
        let hoursZero;
        let minutesZero;
        let secondsZero;
        if (hours < 10) {
            hoursZero = `0${hours}`;
        } else hoursZero = hours;

        if (minutes < 10) {
            minutesZero = `0${minutes}`
        } else minutesZero = minutes;
        if (seconds < 10) {
            secondsZero = `0${seconds}`
        } else secondsZero = seconds;
        screen.innerText = `${hoursZero}:${minutesZero}:${secondsZero}`;
        if (!soundOf) {
            teak.play();
        }
    }, speed);
}

function stop() {
    toggleDisabled([
        { block: buttonPause, disabled: true },
        { block: buttonStart },
        { block: buttonStop, disabled: true },
        { block: buttonCreateNum },
        { block: inputCreateNum }
    ]);
    timerOn = false;
    pauseAndStop('stop');
    const arrOfnums = document.querySelectorAll('.square_el');
    if (arrOfnums !== undefined) {
        timerCounterNum = 0;
        timerСounterReverse = 0;
        for (let i = 0; i < arrOfnums.length; i += 1) {
            const square = arrOfnums[i].style;
            square.backgroundColor = 'lightgrey';
            square.color = 'black';
        }
    }
}

function pauseAndStop(isStop) {
    clearInterval(intervalId);
    if (isStop) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        screen.innerText = startScreen;
    }
}

function addNums() {
    const parentEl = document.querySelector('#arr_nums');
    parentEl.innerText = '';
    if (+inputCreateNum.value > 100 || +inputCreateNum.value < 1) {
        alert('Введите число от 1 до 100!');
    } else {
        squaresAmount = +inputCreateNum.value;
        for (let i = 1; i <= squaresAmount; i += 1) {
            const newEl = parentEl.appendChild(document.createElement('li'));
            newEl.setAttribute('class', 'square_el');
            newEl.innerText = i;
        }
    }
}

function toggleDisabled(arrToLock) {
    arrToLock.forEach(({ block, disabled = false }) => {
        const buttonCopy = block;
        if (disabled) {
            buttonCopy.style.opacity = 0.5;
            buttonCopy.style.pointerEvents = 'none';
        } else {
            buttonCopy.style.opacity = 1;
            buttonCopy.style.pointerEvents = 'auto';
        }
        buttonCopy.disabled = disabled;
    });
}

function changeSpeed(speed) {
    // eslint-disable-next-line func-names
    return function () {
        toggleDisabled([
            { block: buttonX1, disabled: speed === 1 },
            { block: buttonX2, disabled: speed === 2 },
            { block: buttonX3, disabled: speed === 3 }
        ]);
        speedFactor = speed;
        if (timerOn) {
            clearInterval(intervalId);
            counter();
        }
    }
}

inputCreateNum.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        addNums();
    }
});
buttonCreateNum.addEventListener('click', addNums);
buttonStart.addEventListener('click', () => {
    toggleDisabled([
        { block: buttonPause },
        { block: buttonStart, disabled: true },
        { block: buttonStop, },
        { block: buttonCreateNum, disabled: true },
        { block: inputCreateNum, disabled: true }
    ]);
    timerOn = true;
    counter();
});
buttonPause.addEventListener('click', () => {
    toggleDisabled([
        { block: buttonPause, disabled: true },
        { block: buttonStart }
    ]);
    timerOn = false;
    pauseAndStop();
});
buttonStop.addEventListener('click', stop);
buttonX1.addEventListener('click', changeSpeed(1));
buttonX2.addEventListener('click', changeSpeed(2));
buttonX3.addEventListener('click', changeSpeed(3));
buttonSound.addEventListener('click', () => {
    const style = buttonSound.style;
    if (soundOf) {
        soundOf = false;
        buttonSound.innerText = 'Sound: on';
        style.backgroundColor = 'lightsteelblue';
    } else {
        soundOf = true;
        buttonSound.innerText = 'Sound: off';
        style.backgroundColor = 'IndianRed';
    }
});
