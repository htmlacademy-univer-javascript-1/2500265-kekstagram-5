import { checkForRepeatsInHashtags, isEscape } from './utils.js';
import { addFilter, removeFilter } from './effect.js';
import {addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, setDefaultPhotoSize } from './scales.js';
import './sending-form.js';

const DEFAULT_PICTURE = 'img/upload-default-image.jpg';
const TYPES_OF_FILES = ['jpg', 'jpeg', 'png'];
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_NUMBER = 5;
const regularExpression = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const classOfError = 'upload-form__error-text';

const currentForm = document.querySelector('.img-upload__form');
const photoPreview = currentForm.querySelector('.img-upload__preview img');
const effectsPreview = currentForm.querySelectorAll('.effects__preview');
const loadImage = currentForm.querySelector('.img-upload__input');
const uploadOverlay = currentForm.querySelector('.img-upload__overlay');
const closingElement = uploadOverlay.querySelector('.img-upload__cancel');
const uploadSubmitButton = currentForm.querySelector('.img-upload__submit');
const hashtagsInputForm = currentForm.querySelector('.text__hashtags');
const descriptionInputForm = currentForm.querySelector('.text__description');

const pristine = new Pristine(currentForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: classOfError
}, true);

let messageIfErrorInHashtag = '';

const makeHashtagValidation = (currentHashtag) => {
  messageIfErrorInHashtag = '';
  currentHashtag = currentHashtag.trim().toLowerCase();

  if(!currentHashtag) {
    return true;
  }

  const allHashtags = currentHashtag.split(/\s+/);

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
  setDefaultPhotoSize();
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

export {hideEditingForm, onClosingWindowKeydown};
