import { generatePhoto } from './photo.js';

// Создание массива объектов фотографий
const photosInfo = [];
for (let i = 1; i <= 25; i++) {
  const currentPhoto = generatePhoto(i);
  currentPhoto.generateComments();
  photosInfo.push(currentPhoto);
}

// Функция для отрисовки миниатюр
const renderPictures = (photos) => {
  const photosContainer = document.querySelector('.pictures');
  const currentFragment = document.createDocumentFragment();

  photos.forEach((currentPhoto) => {
    const photoElement = document.createElement('div');
    photoElement.classList.add('picture');

    const img = document.createElement('img');
    img.src = currentPhoto.url;
    img.alt = currentPhoto.description;
    photoElement.appendChild(img);

    const likes = document.createElement('div');
    likes.classList.add('picture__likes');
    likes.textContent = `${currentPhoto.likes} Likes`;
    photoElement.appendChild(likes);

    const comments = document.createElement('div');
    comments.classList.add('picture__comments');
    comments.textContent = `${currentPhoto.comments} Comments`;
    photoElement.appendChild(comments);

    currentFragment.appendChild(photoElement);
  });

  photosContainer.appendChild(currentFragment);
};

// Ждем загрузки DOM перед вызовом функции
document.addEventListener('DOMContentLoaded', () => {
  renderPictures(photosInfo);
});
