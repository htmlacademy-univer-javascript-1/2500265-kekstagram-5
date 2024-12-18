import { checkForRepeatsInHashtags, isEscape } from './utils.js';
import { addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, addFilter, removeFilter } from './effect.js';
import { sendData } from './api.js';

const DEFAULT_PICTURE = 'img/upload-default-image.jpg';
const TYPES_OF_FILES = ['jpg', 'jpeg', 'png'];
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_NUMBER = 5;
const regularExpression = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const classOfError = 'upload-form__error-text';
let messageIfErrorInHashtag = '';

const currentForm = document.querySelector('.img-upload__form');
const photoPreview = currentForm.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const loadImage = currentForm.querySelector('.img-upload__input');
const uploadOverlay = currentForm.querySelector('.img-upload__overlay');
const closingElement = uploadOverlay.querySelector('.img-upload__cancel');
const uploadSubmitButton = currentForm.querySelector('.img-upload__submit');
const hashtagsInputForm = currentForm.querySelector('.text__hashtags');
const descriptionInputForm = currentForm.querySelector('.text__description');
const ifSuccessAppearingForm = document.querySelector('#success').content.querySelector('.success');
const successClosingElement = ifSuccessAppearingForm.querySelector('.success__button');
const ifErrorAppearingForm = document.querySelector('#error').content.querySelector('.error');
const errorClosingElement = ifErrorAppearingForm.querySelector('.error__button');

const pristine = new Pristine(currentForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: classOfError
}, true);

const makeHashtagValidation = (currentHashtag) => {
  messageIfErrorInHashtag = '';
  currentHashtag = currentHashtag.trim().toLowerCase();
  const allHashtags = currentHashtag.split(/\s+/);

  if(!currentHashtag) {
    return true;
  }

  for (const hashtag of allHashtags) {
    if (!regularExpression.test(hashtag)) {
      messageIfErrorInHashtag = 'Введён некорректный хэштег';
      return false;
    }
    if (allHashtags.length > MAX_HASHTAGS_NUMBER) {
      messageIfErrorInHashtag = `Превышено максимально допустимое количество хэштегов: ${MAX_HASHTAGS_NUMBER}`;
      return false;
    }
    if (checkForRepeatsInHashtags(allHashtags)) {
      messageIfErrorInHashtag = 'Хэштеги должны быть уникальными';
      return false;
    }
  }
  return true;
};

const onInputInForm = () => {
  if (pristine.validate()) {
    uploadSubmitButton.disabled = false;
  } else {
    uploadSubmitButton.disabled = true;
  }
};

const makeDescrValidation = (value) => value.length <= MAX_COMMENT_LENGTH;

const getMessageIfErrorInHashtag = () => messageIfErrorInHashtag;

pristine.addValidator(hashtagsInputForm, makeHashtagValidation, getMessageIfErrorInHashtag);
pristine.addValidator(descriptionInputForm, makeDescrValidation, `Максимальная длина комментария - ${MAX_COMMENT_LENGTH} символов`);

const onClosingWindowKeydown = (evt) => {
  if (isEscape(evt) && evt.target !== hashtagsInputForm && evt.target !== descriptionInputForm) {
    hideEditingForm();
  }
};

const onCloseWindowElementClick = () => hideEditingForm();

function hideEditingForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  loadImage.value = '';
  photoPreview.src = DEFAULT_PICTURE;
  effectsPreview.forEach((currentPreview) => {
    currentPreview.style.removeProperty('background-image');
  });
  removeFilter();
  removeEventListenerFromScaleElemets();

  closingElement.removeEventListener('click', onCloseWindowElementClick);
  document.removeEventListener('keydown', onClosingWindowKeydown);
  hashtagsInputForm.removeEventListener('input', onInputInForm);
  descriptionInputForm.removeEventListener('input', onInputInForm);

  currentForm.reset();
  pristine.reset();
}

const showEditingForm = () => {
  const currentImage = loadImage.files[0];

  if (TYPES_OF_FILES.some((currentType) => currentImage.name.toLowerCase().endsWith(currentType))) {
    photoPreview.src = URL.createObjectURL(currentImage);
    effectsPreview.forEach((currentPreview) => {
      currentPreview.style.backgroundImage = `url('${URL.createObjectURL(currentImage)}')`;
    });
  }

  addFilter();
  addEventListenerToScaleElemets();

  closingElement.addEventListener('click', onCloseWindowElementClick);
  document.addEventListener('keydown', onClosingWindowKeydown);
  hashtagsInputForm.addEventListener('input', onInputInForm);
  descriptionInputForm.addEventListener('input', onInputInForm);

  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
};

const onLoadingPhotoElementChange = () => showEditingForm();

loadImage.addEventListener('change', onLoadingPhotoElementChange);

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
