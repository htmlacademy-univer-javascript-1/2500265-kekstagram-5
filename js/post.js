
import { getRandomInt, randomIdInRange, randomValueFromArray} from './utils.js';

const userNames = ['Артем', 'Дарья', 'Лука', 'Александр', 'Матвей', 'Лилия'];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const photoNumber = 25;
const randomPhotoID = randomIdInRange(1,25);
const randomMessageID = randomIdInRange(1,20);

const getComment = () => ({
  id: randomMessageID(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: randomValueFromArray(messages),
  name: randomValueFromArray(userNames),
});

const getPhoto = () => {
  const ID = randomPhotoID();

  return {
    id: ID,
    url: `photos/${ID}.jpg`,
    description: `Представьте, что здесь описание фотографии ${ID}`,
    likes: getRandomInt(15, 200),
    comments: Array.from({length: getRandomInt(0, 30)}, getComment),
  };
};

const getPosts = () => Array.from({length: photoNumber}, getPhoto);

export {getPosts};
