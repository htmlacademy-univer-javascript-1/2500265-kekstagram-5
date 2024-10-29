import { makeAllPictures } from './draw-miniatures.js';
import { getPosts } from './post.js';
import { openBigPost } from './draw-big.js';

const allPosts = getPosts();
makeAllPictures(allPosts);

const photoOnClick = (evt) => {
  const currentElement = evt.target.closest('.picture');
  if (currentElement) {
    const currentPicture = allPosts.find((photo) => photo.url === currentElement.querySelector('.picture__img').getAttribute('src'));
    openBigPost(currentPicture);
  }
};

document.querySelector('.pictures').addEventListener('click', photoOnClick);
