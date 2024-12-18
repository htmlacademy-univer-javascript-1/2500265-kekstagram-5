import { makeAllPictures } from './draw-miniatures.js';
import {getData} from './api.js';
import { showingAlert, getArrayRandomPrototype, debounce } from './utils.js';

const TIMEOUT_DELAY = 500;
const NUMBER_OF_RANDOM_PICTURES = 10;
const FILTER_DEFAULT_ELEMENT_CLASS = 'filter-default';
const FILTER_RANDOM_ELEMENT_CLASS = 'filter-random';
const FILTER_ACTIVE_ELEMENT_CLASS = 'img-filters__button--active';
const FILTER_POPULAR_ELEMENT_CLASS = 'filter-discussed';

const filterButtons = document.body.querySelectorAll('.img-filters__button');

let workingFilterId = FILTER_DEFAULT_ELEMENT_CLASS;
let workingFilterElement = document.getElementById(FILTER_DEFAULT_ELEMENT_CLASS);

const makePicturesFilter = (allPictures) => {
  let requiredPictures = [];
  switch (workingFilterId) {
    case FILTER_DEFAULT_ELEMENT_CLASS:
      requiredPictures = allPictures;
      break;
    case FILTER_POPULAR_ELEMENT_CLASS:
      requiredPictures = allPictures.slice().sort((first, second) => second.comments.length - first.comments.length);
      break;
    case FILTER_RANDOM_ELEMENT_CLASS:
      requiredPictures = getArrayRandomPrototype(allPictures, NUMBER_OF_RANDOM_PICTURES);
      break;
  }
  return requiredPictures;
};

const remakeRenderingPictures = (allPictures) => {
  const remadePhotos = makePicturesFilter(allPictures);
  document.querySelectorAll('.picture').forEach((currentPicture) => currentPicture.remove());
  makeAllPictures(remadePhotos);
};

const getFilterButtonsClickWorker = (callback) => (evt) => {
  workingFilterId = evt.target.id;
  workingFilterElement.classList.remove(FILTER_ACTIVE_ELEMENT_CLASS);
  workingFilterElement = evt.target;
  workingFilterElement.classList.add(FILTER_ACTIVE_ELEMENT_CLASS);
  callback();
};

getData()
  .then((allPictures) => {
    makeAllPictures(allPictures);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    const onClickFilterButton = getFilterButtonsClickWorker(debounce(() => remakeRenderingPictures(allPictures), TIMEOUT_DELAY));
    filterButtons.forEach((currentElement) => currentElement.addEventListener('click', onClickFilterButton));
  })
  .catch((error) => showingAlert(error.message));
