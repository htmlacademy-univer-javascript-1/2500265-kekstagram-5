import {isEscape} from './utils.js';
import {sendData} from './api.js';
import {hideEditingForm, onClosingWindowKeydown} from './adding-form.js';

const currentForm = document.querySelector('.img-upload__form');
const uploadOverlay = currentForm.querySelector('.img-upload__overlay');
const uploadSubmitButton = currentForm.querySelector('.img-upload__submit');
const ifSuccessAppearingForm = document.querySelector('#success').content.querySelector('.success');
const successClosingElement = ifSuccessAppearingForm.querySelector('.success__button');
const ifErrorAppearingForm = document.querySelector('#error').content.querySelector('.error');
const errorClosingElement = ifErrorAppearingForm.querySelector('.error__button');

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикация...';
};

const unlockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

const closingFormClickHandler = (className, currentFunction) => (evt) => {
  if (evt.target.closest(`.${className}`) === null) {
    currentFunction();
  }
};

const getKeydownHandler = (currentFunction) => (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    currentFunction();
  }
};

const onOutsideIfSuccessFormClick = closingFormClickHandler('success__inner', closeSuccessAlert);
const onOutsideIfErrorFormClick = closingFormClickHandler('error__inner', closeErrorAlert);
const onErrorCloseButtonClick = () => closeErrorAlert();
const onSuccessCloseButtonClick = () => closeSuccessAlert();
const onSuccessFormKeydown = getKeydownHandler(closeSuccessAlert);
const onErrorFormKeydown = getKeydownHandler(closeErrorAlert);

function closeSuccessAlert() {
  document.removeEventListener('click', onOutsideIfSuccessFormClick);
  document.removeEventListener('keydown', onSuccessFormKeydown);
  document.body.removeChild(ifSuccessAppearingForm);
  successClosingElement.removeEventListener('click', onSuccessCloseButtonClick);
}

function closeErrorAlert() {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onClosingWindowKeydown);
  document.body.removeChild(ifErrorAppearingForm);
  errorClosingElement.removeEventListener('click', onErrorCloseButtonClick);
  document.removeEventListener('click', onOutsideIfErrorFormClick);
  document.removeEventListener('keydown', onErrorFormKeydown);
}

const openSuccessAlert = () => {
  successClosingElement.addEventListener('click', onSuccessCloseButtonClick);
  document.body.appendChild(ifSuccessAppearingForm);
  document.addEventListener('click', onOutsideIfSuccessFormClick);
  document.addEventListener('keydown', onSuccessFormKeydown);
};

const openErrorAlert = () => {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onClosingWindowKeydown);
  errorClosingElement.addEventListener('click', onErrorCloseButtonClick);
  document.body.appendChild(ifErrorAppearingForm);
  document.addEventListener('click', onOutsideIfErrorFormClick);
  document.addEventListener('keydown', onErrorFormKeydown);
};

currentForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  blockSubmitButton();

  sendData(new FormData(evt.target))
    .then(() => {
      hideEditingForm();
      openSuccessAlert();
    })
    .catch(openErrorAlert)
    .finally(unlockSubmitButton);
});
