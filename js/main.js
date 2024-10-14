import { generatePhoto } from './photo.js';

// Создание массива объектов фотографий
const photos = [];
for (let i = 1; i <= 25; i++) {
  const currentPhoto = generatePhoto(i);
  currentPhoto.generateComments();
  photos.push(currentPhoto);
}
