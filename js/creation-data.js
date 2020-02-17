'use strict';

(function () {
  var AVATAR_QUANTITY = 6;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MAX_COMMENTS = 4;


  var messageVariants = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var names = ['Оля', 'Катя', 'Женя', 'Дима', 'Сергей', 'Роман', 'Юра', 'Даша', 'Полина'];

  // ------------ создаем моки
  var createComment = function () {
    var comment = {};
    var randomAvatar = Math.floor(Math.random() * (AVATAR_QUANTITY - 1) + 1);
    comment.avatar = 'img/avatar-' + randomAvatar + '.svg';
    comment.message = window.util.selectRandomFromArray(messageVariants);
    comment.name = window.util.selectRandomFromArray(names);
    return comment;
  };

  var createObject = function (index) {
    var dataItem = {};
    dataItem.url = 'photos/' + (index) + '.jpg';
    dataItem.description = 'описание фотографии ' + (index);
    dataItem.likes = Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES) + MIN_LIKES);
    dataItem.comments = [];
    var commentsQuantity = Math.floor(Math.random() * (MAX_COMMENTS - 1) + 1);
    for (var i = 0; i < commentsQuantity; i++) {
      dataItem.comments[i] = createComment();
    }
    return dataItem;
  };


  var get = function () {
    var data = [];
    for (var j = 1; j <= window.consts.PHOTOS_QUANTITY; j++) {
      data[j - 1] = createObject(j);
    }
    return data;
  };

  // createDatа();

  window.creationData = {
    get: get
  };
})();
