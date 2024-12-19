import { isEscape } from './utils.js';

const COMMENT_STEP = 5;
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
  const createdFragment = document.createDocumentFragment();
  const commentsToShow = currentPhoto.comments.slice(currentCommentIndex, currentCommentIndex + COMMENT_STEP);

  commentsToShow.forEach((currentComment) => {
    createdFragment.appendChild(remakeComment(currentComment));
  });

  bigPictureAllComments.appendChild(createdFragment);
  currentCommentIndex += commentsToShow.length;

  if (currentCommentIndex >= currentPhoto.comments.length) {
    bigPictureCommentsLoaderButton.classList.add('hidden');
  } else {
    bigPictureCommentsLoaderButton.classList.remove('hidden');
  }

  bigPictureCommentsCounter.innerHTML = `${currentCommentIndex} из <span class="comments-count">${currentPhoto.comments.length}</span> комментариев`;
};

const remakePhoto = () => {
  bigPicturePhoto.src = currentPhoto.url;
  bigPictureLikesNumber.textContent = currentPhoto.likes;
  bigPictureDescr.textContent = currentPhoto.description;

  makeEmptyComments();
  renderComments();
};

const listenKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPost();
  }
};

const onClosePostClick = () => closeBigPost();
const onCommentsLoaderButtonClick = () => renderComments();

const openBigPost = (currentPost) => {
  currentPhoto = currentPost;
  currentCommentIndex = 0;
  remakePhoto();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', listenKeydown);
  bigPictureClosing.addEventListener('click', onClosePostClick);
  bigPictureCommentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
};

function closeBigPost() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCommentsLoaderButton.classList.remove('hidden');
  document.removeEventListener('keydown', listenKeydown);
  bigPictureClosing.removeEventListener('click', onClosePostClick);
  bigPictureCommentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
}

export {openBigPost};
