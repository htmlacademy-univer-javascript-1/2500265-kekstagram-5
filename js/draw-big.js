import { isEscape } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClosing = bigPicture.querySelector('.big-picture__cancel');
const bigPicturePhoto = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesNumber = bigPicture.querySelector('.likes-count');
const bigPictureDescr = bigPicture.querySelector('.social__caption');
const bigPictureAllComments = bigPicture.querySelector('.social__comments');
const bigPictureCurrentCommentTemplate = bigPictureAllComments.querySelector('.social__comment');
const bigPictureCommentsLoaderButton = bigPicture.querySelector('.comments-loader');
const bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');

let currentPhoto;
let currentCommentIndex = 0;

const makeEmptyComments = () => {
  bigPictureAllComments.innerHTML = '';
};

const remakeComment = (comment) => {
  const remadeComment = bigPictureCurrentCommentTemplate.cloneNode(true);
  const userAvatar = remadeComment.querySelector('.social__picture');
  userAvatar.src = comment.avatar;
  userAvatar.alt = comment.name;
  remadeComment.querySelector('.social__text').textContent = comment.message;
  return remadeComment;
};

const renderComments = () => {
  let currentIndex = 0;
  for (let i = currentCommentIndex; i < currentCommentIndex + 5; i++) {
    if (i === currentPhoto.comments.length) {
      bigPictureCommentsLoaderButton.classList.add('hidden');
      currentIndex = i - 1;
      break;
    }
    currentIndex = i;
    bigPictureAllComments.appendChild(remakeComment(currentPhoto.comments[i]));
  }
  currentCommentIndex = currentIndex + 1;
  bigPictureCommentsCounter.innerHTML = `${currentCommentIndex} из <span class="comments-count">${currentPhoto.comments.length}</span> комментариев`;
};

const remakePhoto = () => {
  bigPicturePhoto.src = currentPhoto.url;
  bigPictureLikesNumber.textContent = currentPhoto.likes;
  bigPictureDescr.textContent = currentPhoto.description;

  makeEmptyComments();
  renderComments(currentPhoto);
};

const listenKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPost();
  }
};

const openBigPost = (currentPost) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', listenKeydown);
  currentPhoto = currentPost;
  remakePhoto();
};

function closeBigPost() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCommentsLoaderButton.classList.remove('hidden');
  document.removeEventListener('keydown', listenKeydown);
  currentCommentIndex = 0;
}

bigPictureClosing.addEventListener('click', () => {
  closeBigPost();
});

bigPictureCommentsLoaderButton.addEventListener('click', () => {
  renderComments();
});

export {openBigPost};
