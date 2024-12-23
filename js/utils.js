const TIME_FOR_ALERT = 5000;
const TIMEOUT_DELAY = 500;
const isEscape = (evt) => evt.key === 'Escape';

const getRandomIntValue = (min, max) => {
  const lowerValue = Math.ceil(Math.min(min, max));
  const upperValue = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
};

const getArrayRandomPrototype = (currentArray, prototypeSize) => {
  if (currentArray.length <= prototypeSize) {
    return currentArray.slice();
  }
  const copiedArray = currentArray.slice();
  const prototype = [];
  for (let i = 0; i < prototypeSize; i++) {
    const randomIntIndex = getRandomIntValue(0, copiedArray.length - 1);
    prototype.push(copiedArray[randomIntIndex]);
    copiedArray.splice(randomIntIndex, 1);
  }
  return prototype;
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showingAlert = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.zIndex = '100';
  alertMessage.style.position = 'absolute';
  alertMessage.style.left = '0';
  alertMessage.style.top = '0';
  alertMessage.style.right = '0';
  alertMessage.style.padding = '10px 3px';
  alertMessage.style.fontSize = '30px';
  alertMessage.style.textAlign = 'center';
  alertMessage.style.backgroundColor = 'red';
  alertMessage.textContent = message;
  document.body.append(alertMessage);
  setTimeout(() => {
    alertMessage.remove();
  }, TIME_FOR_ALERT);
};

const checkForRepeatsInHashtags = (arr) => {
  const elements = {};
  for (const element of arr) {
    if (elements[element]) {
      return true;
    }
    elements[element] = 1;
  }
  return false;
};

export {
  isEscape,
  checkForRepeatsInHashtags,
  showingAlert,
  getRandomIntValue,
  getArrayRandomPrototype,
  debounce
};
