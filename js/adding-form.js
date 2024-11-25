import {isEscape} from './utils.js';

const MAX_HASHTAG_NUMBER = 5;
const SYMBOLS_FOR_VALIDATION = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorsText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_NUMBER} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Некорректный хэштег'
};

const body = document.querySelector('body');
const currentForm = document.querySelector('.img-upload__form');
const uploadOverlay = currentForm.querySelector('.img-upload__overlay');
const fieldForHashtags = currentForm.querySelector('.text__hashtags');

const pristine = new Pristine(currentForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
const hideForm = () => {
  currentForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
const prepareTags = (string) => string.trim().split(' ').filter((currentTag) => Boolean(currentTag.length));
const isOnFocuse = () => document.activeElement === fieldForHashtags || document.activeElement === currentForm.querySelector('.text__description');
const makeCountValidation = (value) => prepareTags(value).length <= MAX_HASHTAG_NUMBER;
const makeHashtagsValidation = (value) => prepareTags(value).every((tag) => SYMBOLS_FOR_VALIDATION.test(tag));

const makeUniqueValidation = (value) => {
  const remadeTags = prepareTags(value).map((currentTag) => currentTag.toLowerCase());
  return remadeTags.length === new Set(remadeTags).size;
};

function onDocumentKeydown(evt) {
  if (isEscape && !isOnFocuse()) {
    evt.preventDefault();
    hideForm();
  }
}

const onCancelClick = () => hideForm();
const onInputChange = () => showForm();

pristine.addValidator(
  fieldForHashtags,
  makeUniqueValidation,
  ErrorsText.NOT_UNIQUE,
  1,
  true
);

pristine.addValidator(
  fieldForHashtags,
  makeHashtagsValidation,
  ErrorsText.INVALID_PATTERN,
  2,
  true
);

pristine.addValidator(
  fieldForHashtags,
  makeCountValidation,
  ErrorsText.INVALID_COUNT,
  3,
  true
);

currentForm.querySelector('.img-upload__input').addEventListener('change', onInputChange);
currentForm.querySelector('.img-upload__cancel').addEventListener('click', onCancelClick);
