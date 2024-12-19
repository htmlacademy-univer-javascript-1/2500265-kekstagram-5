const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectsContainerElement = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectValueElement = sliderContainer.querySelector('.effect-level__value');

const EffectsParameters = {
  NONE: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1
  },
  CHROME: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1
  },
  SEPIA: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1
  },
  MARVIN: {
    MIN: 0,
    MAX: 100,
    STEP: 1
  },
  PHOBOS: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1
  },
  HEAT: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1
  }
};

let currentFilterType;
let currentFilterClass;
let currentEffectParameters;

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

const changeFilterParameters = (effectClass, effectType, effectParameters) => {
  if (effectType === 'none') {
    sliderContainer.setAttribute('hidden', true);
  } else {
    sliderContainer.removeAttribute('hidden');
  }
  currentFilterClass = effectClass;
  currentFilterType = effectType;
  currentEffectParameters = effectParameters;
};

const changeFilter = (currentFilterID) => {
  switch (currentFilterID) {
    case 'effect-none':
      changeFilterParameters('effects__preview--none', 'none',
        getEffectParameters(EffectsParameters.NONE.MIN, EffectsParameters.NONE.MAX, EffectsParameters.NONE.STEP,
          (value) => value, (value) => parseFloat(value)));
      break;

    case 'effect-chrome':
      changeFilterParameters('effects__preview--chrome', 'grayscale',
        getEffectParameters(EffectsParameters.CHROME.MIN, EffectsParameters.CHROME.MAX, EffectsParameters.CHROME.STEP,
          (value) => value.toFixed(1), (value) => parseFloat(value)));
      break;

    case 'effect-sepia':
      changeFilterParameters('effects__preview--sepia', 'sepia',
        getEffectParameters(EffectsParameters.SEPIA.MIN, EffectsParameters.SEPIA.MAX, EffectsParameters.SEPIA.STEP,
          (value) => value.toFixed(1), (value) => parseFloat(value)));
      break;

    case 'effect-marvin':
      changeFilterParameters('effects__preview--marvin', 'invert',
        getEffectParameters(EffectsParameters.MARVIN.MIN, EffectsParameters.MARVIN.MAX, EffectsParameters.MARVIN.STEP,
          (value) => `${value}%`, (value) => parseFloat(value)));
      break;

    case 'effect-phobos':
      changeFilterParameters('effects__preview--phobos', 'blur',
        getEffectParameters(EffectsParameters.PHOBOS.MIN, EffectsParameters.PHOBOS.MAX, EffectsParameters.PHOBOS.STEP,
          (value) => `${value.toFixed(1)}px`, (value) => parseFloat(value)));
      break;

    case 'effect-heat':
      changeFilterParameters('effects__preview--heat', 'brightness',
        getEffectParameters(EffectsParameters.HEAT.MIN, EffectsParameters.HEAT.MAX, EffectsParameters.HEAT.STEP,
          (value) => value.toFixed(1), (value) => parseFloat(value)));
      break;
  }
  imageUploadPreview.className = '';
  imageUploadPreview.classList.add(currentFilterClass);
  sliderElement.noUiSlider.updateOptions(currentEffectParameters);
};

const onFilterChange = (evt) => {
  if (evt.target.closest('.effects__item')) {
    changeFilter(evt.target.id);
  }
};

const addFilter = () => {
  effectValueElement.value = 1;
  currentFilterType = 'none';
  noUiSlider.create(sliderElement, getEffectParameters(0, 1, 0.1, (value) => value, (value) => parseFloat(value)));
  sliderContainer.setAttribute('hidden', true);
  effectsContainerElement.addEventListener('change', onFilterChange);

  sliderElement.noUiSlider.on('update', () => {
    effectValueElement.value = parseFloat(sliderElement.noUiSlider.get());
    imageUploadPreview.style.filter = (currentFilterType !== 'none') ? `${currentFilterType}(${sliderElement.noUiSlider.get()})` : '';
  });
};

const removeFilter = () => {
  effectsContainerElement.removeEventListener('change', onFilterChange);
  imageUploadPreview.className = '';
  imageUploadPreview.style.transform = 'scale(1)';
  document.getElementById('effect-none').checked = true;
  sliderElement.noUiSlider.destroy();
};

export { addFilter, removeFilter };
