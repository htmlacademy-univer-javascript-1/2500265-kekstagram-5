const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;
const PERCENT = 100;

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectsContainerElement = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectValueElement = sliderContainer.querySelector('.effect-level__value');

let filterType = 'none';

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

const getEffectParameters = (min, max, step, funcTo, funcFrom) => ({
  range: {
    min: min,
    max: max,
  },
  start: max,
  step: step,
  connect: 'lower',
  format: {
    to: funcTo,
    from: funcFrom
  }
});

const changeFilter = (currentFilterID) => {
  let currentFilterClass;
  let effectParameters;
  switch (currentFilterID) {
    case 'effect-none':
      sliderContainer.setAttribute('hidden', true);
      currentFilterClass = 'effects__preview--none';
      filterType = 'none';
      effectParameters = getEffectParameters(0, 1, 0.1, (value) => value, (value) => parseFloat(value));
      break;

    case 'effect-chrome':
      sliderContainer.removeAttribute('hidden');
      currentFilterClass = 'effects__preview--chrome';
      filterType = 'grayscale';
      effectParameters = getEffectParameters(0, 1, 0.1, (value) => value.toFixed(1), (value) => parseFloat(value));
      break;

    case 'effect-sepia':
      sliderContainer.removeAttribute('hidden');
      currentFilterClass = 'effects__preview--sepia';
      filterType = 'sepia';
      effectParameters = getEffectParameters(0, 1, 0.1, (value) => value.toFixed(1), (value) => parseFloat(value));
      break;

    case 'effect-marvin':
      sliderContainer.removeAttribute('hidden');
      currentFilterClass = 'effects__preview--marvin';
      filterType = 'invert';
      effectParameters = getEffectParameters(0, 100, 1, (value) => `${value}%`, (value) => parseFloat(value));
      break;

    case 'effect-phobos':
      sliderContainer.removeAttribute('hidden');
      currentFilterClass = 'effects__preview--phobos';
      filterType = 'blur';
      effectParameters = getEffectParameters(0, 3, 0.1, (value) => `${value.toFixed(1)}px`, (value) => parseFloat(value));
      break;

    case 'effect-heat':
      sliderContainer.removeAttribute('hidden');
      currentFilterClass = 'effects__preview--heat';
      filterType = 'brightness';
      effectParameters = getEffectParameters(1, 3, 0.1, (value) => value.toFixed(1), (value) => parseFloat(value));
      break;
  }
  imageUploadPreview.className = '';
  imageUploadPreview.classList.add(currentFilterClass);
  sliderElement.noUiSlider.updateOptions(effectParameters);
};

const onFilterChange = (evt) => {
  if (evt.target.closest('.effects__item')) {
    changeFilter(evt.target.id);
  }
};

const addFilter = () => {
  effectValueElement.value = 1;
  filterType = 'none';
  noUiSlider.create(sliderElement, getEffectParameters(0, 1, 0.1, (value) => value, (value) => parseFloat(value)));
  sliderContainer.setAttribute('hidden', true);
  effectsContainerElement.addEventListener('change', onFilterChange);

  sliderElement.noUiSlider.on('update', () => {
    effectValueElement.value = parseFloat(sliderElement.noUiSlider.get());
    imageUploadPreview.style.filter = (filterType !== 'none') ? `${filterType}(${sliderElement.noUiSlider.get()})` : '';
  });
};

const removeFilter = () => {
  effectsContainerElement.removeEventListener('change', onFilterChange);
  imageUploadPreview.className = '';
  imageUploadPreview.style.transform = 'scale(1)';
  document.getElementById('effect-none').checked = true;
  sliderElement.noUiSlider.destroy();
};

export {addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, addFilter, removeFilter };
