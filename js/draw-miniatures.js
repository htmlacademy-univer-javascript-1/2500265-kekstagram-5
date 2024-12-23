import { openBigPost } from './draw-big.js';

const pictureElements = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

let currentPictures = [];

const makeAllPictures = (allPictures) => {
  currentPictures = allPictures;
  const fragmentPictures = document.createDocumentFragment();

  allPictures.forEach(({url, description, likes, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    const image = photoElement.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragmentPictures.appendChild(photoElement);
  });

  pictureElements.querySelectorAll('.picture').forEach((picture) => picture.remove());
  pictureElements.appendChild(fragmentPictures);
};

pictureElements.addEventListener('click', (evt) => {
  const currentElement = evt.target.closest('.picture');
  if (currentElement) {
    const currentPhoto = currentPictures.find((pict) => pict.url === currentElement.querySelector('.picture__img').getAttribute('src'));
    openBigPost(currentPhoto);
  }
});

export {makeAllPictures};
