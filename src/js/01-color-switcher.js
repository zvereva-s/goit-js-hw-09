
//======== refs ========//
const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}

let timerId = null;

refs.btnStart.addEventListener('click', () => {
    refs.btnStart.setAttribute('disabled', true);
    
    timerId = setInterval(() => {
    return changeBcgColor()}, 1000)
});

refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId)
});

function changeBcgColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


