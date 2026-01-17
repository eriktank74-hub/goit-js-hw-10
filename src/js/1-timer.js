import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate = new Date();
let startEnable = false;
const startButton = document.querySelector('#start-button');
const inputDate = document.querySelector('#datetime-picker');

function addLeadingZero(value) {
    return (value + '').padStart(2, '0')
}

function convertMs(ms) {
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
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
        startEnable = false;
        startButton.disabled = !startEnable;
        return;
    }

    userSelectedDate = selectedDates[0];
    startEnable = true;
    startButton.disabled = !startEnable;
   
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {
    inputDate.disabled = true;
    startButton.disabled = true;

    const interval = setInterval(() => {
        const ms = userSelectedDate.getTime() - Date.now();        
        const { days, hours, minutes, seconds } = convertMs(ms);
        const daysElement = document.querySelector('[data-days]');
        const hoursElement = document.querySelector('[data-hours]');
        const minutesElement = document.querySelector('[data-minutes]');
        const secondsElement = document.querySelector('[data-seconds]');

        if (ms < 0) {
            daysElement.innerText = '00';
            hoursElement.innerText = '00';
            minutesElement.innerText = '00';
            secondsElement.innerText = '00';
            inputDate.disabled = false;
            clearInterval(interval);
            return;
        }

        daysElement.innerText = addLeadingZero(days);
        hoursElement.innerText = addLeadingZero(hours);
        minutesElement.innerText = addLeadingZero(minutes);
        secondsElement.innerText = addLeadingZero(seconds);
    }, 1000);
})

