const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const gameover = document.querySelector('.gameover')
const voltar = document.querySelector('.voltar')
const comeco = document.querySelector('.comeco')
document.form_main.start.onclick = () => start();


let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

function timer() {
    if ((millisecond += 10) == 1000) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
    return input >= 10 ? input : `0${input}`;
}

function start() {

    const jump = () => {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }


    clearInterval(cron);
    comeco.style.display = 'none';
    pipe.style.visibility = 'visible';
    cron = setInterval(() => { timer(); }, 10);
    pipe.style.animation = 'pipe-animation 3s infinite linear';
    if (window.matchMedia("(max-width: 1000px)").matches) {
        pipe.style.animation = 'pipe-animation 1s infinite linear';
        clearInterval(cron);
        comeco.style.display = 'none';
        pipe.style.visibility = 'visible';
        cron = setInterval(() => { timer(); }, 10);
    }

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        if (pipePosition <= 80 && pipePosition > 0 && marioPosition <= 64) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = './images/mario-death.png';
            mario.style.width = '96px';
            gameover.style.visibility = 'visible';
            voltar.style.visibility = 'visible';
            voltar.style.display = 'block';
            voltar.style.animation = 'comeco-animation 500ms infinite';

            clearInterval(loop);
            clearInterval(cron);
        }
        if (second == 9) {
            pipe.style.animation = 'pipe-animation 1s infinite linear';
            if (window.matchMedia("(max-width: 1000px)").matches) {
                pipe.style.animation = 'pipe-animation 750ms infinite linear';
            }
        }
        if (second == 18) {
            pipe.style.animation = 'pipe-animation 750ms infinite linear';
        }
        if (second == 19) {
            if (window.matchMedia("(max-width: 1000px)").matches) {
                pipe.style.animation = 'pipe-animation 650ms infinite linear';
            }
        }

        document.addEventListener('keydown', jump);
        document.addEventListener('click', jump);

    }, 10);
}

