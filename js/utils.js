const TIME_FOR_ALERT = 5000;
const isEscape = (evt) => evt.key === 'Escape';

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
  showingAlert
};
