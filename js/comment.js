import { getRandomInt } from './utils.js';

const userNames = ['Артем', 'Дарья', 'Лука', 'Александр', 'Матвей', 'Лилия'];

// Функция генерации случайного предложения для комментария
function getRandomMessage() {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const randomIndex = getRandomInt(0, messages.length - 1);
  return messages[randomIndex];
}

// Функция генерации объекта комментария
export function generateComment() {
  let currentId, avatarNum;
  const usedIds = new Set();
  const usedAvatars = new Set();
  do {
    currentId = getRandomInt(1, 1000);
  } while (usedIds.has(currentId));
  usedIds.add(currentId);
  do {
    avatarNum = getRandomInt(1, 6);
  } while (usedAvatars.has(avatarNum));
  usedAvatars.add(avatarNum);
  return {
    id: currentId,
    avatar: `img/avatar-${avatarNum}.svg`,
    message: getRandomMessage(),
    name: userNames[getRandomInt(0, userNames.length - 1)],
  };
}
