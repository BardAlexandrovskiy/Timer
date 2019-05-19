const buttonStart = document.querySelector('#start');
const buttonPause = document.querySelector('#pause');
const buttonStop = document.querySelector('#stop');
const buttonX1 = document.querySelector('#x1_speed');
const buttonX2 = document.querySelector('#x2_speed');
const buttonX3 = document.querySelector('#x3_speed');
const screen = document.querySelector('#screen');
const sendNum = document.querySelector('#send_num');
const numCreate = document.querySelector('#num_create');

const intervalTime = 1000;

let isClick = false;
let screenCounterNum = 0;
let intervalId;
let speedFactor = 1;
let squaresAmount;
let timerCounterNum = 0;
let timerСounterReverse = 0;

function counter() {
    const speed = intervalTime / speedFactor;
    const numTimer = document.querySelectorAll('#arr_nums_el');
    intervalId = setInterval(() => {
        if (numTimer !== undefined) {
            if (timerCounterNum < squaresAmount) {
                numTimer[timerCounterNum].style.backgroundColor = 'lightgreen';
                timerCounterNum += 1;
                timerСounterReverse += 1;
            } else if (timerСounterReverse > 0) {
                timerСounterReverse -= 1;
                numTimer[timerСounterReverse].style.backgroundColor = 'lightgrey';
                if (timerСounterReverse === 0) {
                    timerCounterNum = 0;
                }
            }
        }
        screenCounterNum += 1;
        screen.innerText = screenCounterNum;
    }, speed);
}

function pauseAndStop(isStop) {
    clearInterval(intervalId);
    if (isStop) {
        screenCounterNum = 0;
        screen.innerText = screenCounterNum;
    }
}

function addNums() {
    const parentEl = document.querySelector('#arr_nums');
    if (!isClick && screenCounterNum === 0) {
        parentEl.innerText = '';
        if (+numCreate.value > 100 || +numCreate.value < 1) {
            alert('Введите число от 1 до 100!');
        } else {
            squaresAmount = +numCreate.value;
            for (let i = 1; i <= squaresAmount; i += 1) {
                const newEl = parentEl.appendChild(document.createElement('li'));
                newEl.setAttribute('class', 'el');
                newEl.setAttribute('id', 'arr_nums_el');
                newEl.innerText = i;
            }
        }
    } else alert('Для замены количества цифр нажмите "stop" и попробуйте ещё раз.');
}

function toggleDisabled(arrBtns) {
    arrBtns.forEach(({ btn, disabled = false }) => {
        const buttonCopy = btn;
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

numCreate.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        addNums();
    }
});
sendNum.addEventListener('click', addNums);
buttonStart.addEventListener('click', () => {
    toggleDisabled([
        { btn: buttonPause },
        { btn: buttonStart, disabled: true },
        { btn: buttonStop, },
        { btn: sendNum, disabled: true }
    ]);
    isClick = true;
    counter();
});
buttonPause.addEventListener('click', () => {
    toggleDisabled([
        { btn: buttonPause, disabled: true },
        { btn: buttonStart },
    ]);
    isClick = false;
    pauseAndStop();
});
buttonStop.addEventListener('click', () => {
    toggleDisabled([
        { btn: buttonPause, disabled: true },
        { btn: buttonStart },
        { btn: buttonStop, disabled: true },
        { btn: sendNum }
    ]);
    isClick = false;
    pauseAndStop('stop');
    const arrOfnums = document.querySelectorAll('#arr_nums_el');
    if (arrOfnums !== undefined) {
        timerCounterNum = 0;
        timerСounterReverse = 0;
        for (let i = 0; i < arrOfnums.length; i += 1) {
            arrOfnums[i].style.backgroundColor = 'lightgrey';
        }
    }
});
buttonX1.addEventListener('click', () => {
    toggleDisabled([
        { btn: buttonX1, disabled: true },
        { btn: buttonX2 },
        { btn: buttonX3 }
    ]);
    speedFactor = 1;
    if (isClick) {
        clearInterval(intervalId);
        counter();
    };
});
buttonX2.addEventListener('click', () => {
    toggleDisabled([
        { btn: buttonX1 },
        { btn: buttonX2, disabled: true },
        { btn: buttonX3 }
    ]);
    speedFactor = 2;
    if (isClick) {
        clearInterval(intervalId);
        counter();
    };
});
buttonX3.addEventListener('click', () => {
    toggleDisabled([
        { btn: buttonX1 },
        { btn: buttonX2 },
        { btn: buttonX3, disabled: true }
    ]);
    speedFactor = 3;
    if (isClick) {
        clearInterval(intervalId);
        counter();
    };
});
