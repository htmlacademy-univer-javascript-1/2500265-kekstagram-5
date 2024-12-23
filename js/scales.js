const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;
const DEFAULT_SCALE = 100;

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const updateScale = (direction) => {
  let scaleValue = parseInt(scaleControlValue.value, 10) || DEFAULT_SCALE;
  const newScaleValue = scaleValue + direction * STEP;

  if (newScaleValue >= MIN_SCALE && newScaleValue <= MAX_SCALE) {
    scaleValue = newScaleValue;
    scaleControlValue.value = `${scaleValue}%`;
    imageUploadPreview.style.transform = `scale(${scaleValue / DEFAULT_SCALE})`;
  }
};

const zoomOutImage = () => updateScale(-1);
const zoomInImage = () => updateScale(1);

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
  scaleControlValue.value = `${DEFAULT_SCALE}%`;
};

export { addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, setDefaultPhotoSize };
