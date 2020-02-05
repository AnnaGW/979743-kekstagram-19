'use strict';

var PHOTOS_QUANTITY = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var AVATAR_QUANTITY = 6;

var messageVariants = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var names = ['Оля', 'Катя', 'Женя', 'Дима', 'Сергей', 'Роман', 'Юра', 'Даша', 'Полина'];

var selectRandomFromArray = function (array) {
  var randomIndex = Math.floor(Math.random() * (array.length - 1) + 1);
  return array[randomIndex - 1];
};

var createComment = function () {
  var comment = {};
  var randomAvatar = Math.floor(Math.random() * (AVATAR_QUANTITY - 1) + 1);
  comment.avatar = 'img/avatar-' + randomAvatar + '.svg';
  comment.message = selectRandomFromArray(messageVariants);
  comment.name = selectRandomFromArray(names);
  return comment;
};

var createObject = function (index) {
  var dataItem = {};
  dataItem.url = 'photos/' + (index) + '.jpg';
  dataItem.description = 'описание фотографии ' + (index);
  dataItem.likes = Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES) + MIN_LIKES);
  dataItem.comments = [];
  var commentsQuantity = Math.floor(Math.random() * (4 - 1) + 1);
  for (var i = 0; i < commentsQuantity; i++) {
    dataItem.comments[i] = createComment();
  }
  return dataItem;
};

var data = [];
var createDatа = function () {
  for (var i = 1; i <= PHOTOS_QUANTITY; i++) {
    data[i - 1] = createObject(i);
  }
};

createDatа();

var photoConteiner = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content;
var newPhotoTemplate = photoTemplate.querySelector('.picture');

var createNewPhoto = function (photoIndex) {
  var newPhoto = newPhotoTemplate.cloneNode(true);
  var newPhotoImg = newPhoto.querySelector('.picture__img');
  newPhotoImg.src = data[photoIndex].url;
  var newPhotoLikes = newPhoto.querySelector('.picture__likes');
  newPhotoLikes.textContent = data[photoIndex].likes;
  var newPhotoComments = newPhoto.querySelector('.picture__comments');
  newPhotoComments.textContent = data[photoIndex].comments.length;
  photoConteiner.appendChild(newPhoto);
};

for (var i = 1; i <= PHOTOS_QUANTITY; i++) {
  createNewPhoto(i - 1);
}
