const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;
const PERCENT = 100;

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const zoomOutImage = () => {
  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  if (currentScaleValue > MIN_SCALE) {
    currentScaleValue -= STEP;
    scaleControlValue.value = `${currentScaleValue.toString()}%`;
    imageUploadPreview.style.transform = `scale(${currentScaleValue / PERCENT})`;
  }
};

const zoomInImage = () => {
  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  if (currentScaleValue < MAX_SCALE) {
    currentScaleValue += STEP;
    scaleControlValue.value = `${currentScaleValue.toString()}%`;
    imageUploadPreview.style.transform = `scale(${currentScaleValue / PERCENT})`;
  }
};

const addEventListenerToScaleElemets = () => {
  zoomOutButton.addEventListener('click', zoomOutImage);
  zoomInButton.addEventListener('click', zoomInImage);
};

const removeEventListenerFromScaleElemets = () => {
  zoomOutButton.removeEventListener('click', zoomOutImage);
  zoomInButton.removeEventListener('click', zoomInImage);
};

const setDefaultPhotoSize = () => {
  imageUploadPreview.style.transform = 'scale(1)';
};

export { addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, setDefaultPhotoSize };
