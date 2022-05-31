import { Notify } from 'notiflix/build/notiflix-notify-aio';

//! position - номер создаваемого промиса;

const form = document.querySelector('.form');
const { delay, amount, step } = form.elements;


form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  let counter = 0;
  let pos = 1;
  while (counter < amount.valueAsNumber) {

    createPromise(pos, delay.valueAsNumber).then(({position, timeDelay}) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${timeDelay}ms`);
  })
    .catch(({position, timeDelay}) => {
      Notify.failure(`❌ Rejected promise ${position} in ${timeDelay}ms`);
    })

    counter += 1;
    pos += 1;
    delay.valueAsNumber += step.valueAsNumber;
  }
}

function createPromise(position, timeDelay) { 
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3; 
      if (shouldResolve) {
        resolve({position, timeDelay});
      } else {
        reject({position, timeDelay});
      }
    }, timeDelay);
  });
  return promise;
}