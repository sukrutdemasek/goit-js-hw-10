import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const delayElement = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

function createPromise(event) {
  event.preventDefault();
  const delayState = document.querySelector(
    'input[name="state"]:checked'
  ).value;
  const delayValue = Number(delayElement.value);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delayState === 'fulfilled') {
        resolve(delayValue);
      } else if (delayState === 'rejected') {
        reject(delayValue);
      }
    }, delayValue);
  })
    .then(value =>
      iziToast.success({
        position: 'topCenter',
        messageColor: 'white',
        backgroundColor: 'green',
        message: `✅ Fulfilled promise in ${value} ms`,
      })
    )
    .catch(value =>
      iziToast.error({
        position: 'topCenter',
        messageColor: 'white',
        backgroundColor: 'red',
        message: `❌ Rejected promise in ${value} ms`,
      })
    );
}
form.addEventListener('submit', createPromise);
