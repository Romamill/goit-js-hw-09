import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure("Please select a future date");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

let countdownIntervalId = null;

function startCountdown() {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);

  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
  }

  countdownIntervalId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownIntervalId);
      Notiflix.Report.failure("Time's up!", "The countdown has finished.", "OK");
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      daysValue.textContent = days.toString().padStart(2, "0");
      hoursValue.textContent = hours.toString().padStart(2, "0");
      minutesValue.textContent = minutes.toString().padStart(2, "0");
      secondsValue.textContent = seconds.toString().padStart(2, "0");
    }
  }, 1000);
}

startButton.addEventListener("click", startCountdown);


