// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let button = document.querySelector('#start-button');
let dateObject = {
  secondsElement: document.querySelector('span.value[data-seconds]'),
  minutesElement: document.querySelector('span.value[data-minutes]'),
  hoursElement: document.querySelector('span.value[data-hours]'),
  daysElement: document.querySelector('span.value[data-days]'),
};
let { secondsElement, minutesElement, hoursElement, daysElement } = dateObject;

button.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
};
function updateTimer({ seconds, minutes, hours, days }) {
  secondsElement.textContent = String(seconds).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  daysElement.textContent = String(days).padStart(2, '0');
}
button.addEventListener('click', event => {
  button.disabled = true;
  dateTimeInput.disabled = true;
  const interval = setInterval(() => {
    let diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      dateTimeInput.disabled = true;
      clearInterval(interval);
      updateTimer({ seconds: 0, minutes: 0, hours: 0, days: 0 });
      return;
    }
    const timeLeft = convertMs(diff);
    updateTimer(timeLeft);
  }, 1000);
});
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
const dateTimeInput = document.querySelector('#datetime-picker');
flatpickr(dateTimeInput, options);
