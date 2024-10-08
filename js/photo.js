import { generateComment } from './comment.js';
import { getRandomInt } from './utils.js';

// Функция генерации объекта фотографии
export function generatePhoto(index) {
  const photoId = index;

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Представьте, что здесь описание фотографии ${photoId}`,
    likes: getRandomInt(15, 200),
    comments: [],
    generateComments: function() {
      const countComments = getRandomInt(0, 30);
      for (let j = 0; j < countComments; j++) {
        this.comments.push(generateComment());
      }
    },
  };
}
