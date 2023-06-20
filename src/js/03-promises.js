
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const delayInput = form.elements.delay;
  const stepInput = form.elements.step;
  const amountInput = form.elements.amount;

  const firstDelay = parseInt(delayInput.value);
  const delayStep = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const delay = firstDelay + (i - 1) * delayStep;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
