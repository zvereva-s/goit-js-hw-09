import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

/*======== refs ========*/
const refs = {
    inputPicker: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
}
let deadline = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure('Please choose a date in the future');
            // window.alert('Please choose a date in the future');
            refs.btnStart.setAttribute('disabled', true);
        } else {
            refs.btnStart.removeAttribute('disabled');
            deadline = selectedDates[0];
        }
        
    },
};

refs.btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
timer.start(refs.timer, deadline);
};

const timer = {
    intervalId: null,
    
    start(rootSelector, deadline) {
        if (!deadline) {
            return;
        }
        this.intervalId = setInterval(() => {
            const { days, hours, minutes, seconds } = this.convertMs(deadline - Date.now());

            rootSelector.querySelector('[data-days]').textContent = this.addLeadingZero(days);
            rootSelector.querySelector('[data-hours]').textContent = hours;
            rootSelector.querySelector('[data-minutes]').textContent = minutes;
            rootSelector.querySelector('[data-seconds]').textContent = seconds;
        }, 1000);

        },

    stop() {
        clearInterval(intervalId);
    }, 

    convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
    },

    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    },
}

flatpickr(refs.inputPicker, options);

