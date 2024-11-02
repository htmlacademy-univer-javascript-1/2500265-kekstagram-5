import { isEscape } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClosing = bigPicture.querySelector('.big-picture__cancel');
const bigPicturePhoto = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesNumber = bigPicture.querySelector('.likes-count');
const bigPictureCommentsNumber = bigPicture.querySelector('.comments-count');
const bigPictureDescr = bigPicture.querySelector('.social__caption');
const bigPictureAllComments = bigPicture.querySelector('.social__comments');
const bigPictureCurrentCommentTemplate = bigPictureAllComments.querySelector('.social__comment');

let currentPhoto;

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

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

const remakePhoto = () => {
  bigPicturePhoto.src = currentPhoto.url;
  bigPictureCommentsNumber.textContent = currentPhoto.comments.length;
  bigPictureLikesNumber.textContent = currentPhoto.likes;
  bigPictureDescr.textContent = currentPhoto.description;

  makeEmptyComments();
  for (let i = 0; i < currentPhoto.comments.length; i++){
    bigPictureAllComments.appendChild(remakeComment(currentPhoto.comments[i]));
  }
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
  document.removeEventListener('keydown', listenKeydown);
}

bigPictureClosing.addEventListener('click', () => {
  closeBigPost();
});

export {openBigPost};
