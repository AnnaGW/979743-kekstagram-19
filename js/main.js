'use strict';

var PHOTOS_QUANTITY = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var AVATAR_QUANTITY = 6;

var ESC_KEY = 'Escape';

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

var uploadFile = document.querySelector('#upload-file');
var imgEditForm = document.querySelector('.img-upload__overlay');
var imgEditFormCancel = imgEditForm.querySelector('.img-upload__cancel');
var textHashtags = document.querySelector('.text__hashtags');

var onImgEditFormEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeImgEditForm();
  }
};

var openImgEditForm = function () {
  imgEditForm.classList.remove('hidden');
  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgEditFormEscPress);
  });
  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgEditFormEscPress);
  });
};

var closeImgEditForm = function () {
  imgEditForm.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onImgEditFormEscPress);
};

uploadFile.addEventListener('change', openImgEditForm);

imgEditFormCancel.addEventListener('click', closeImgEditForm);
// ---------------------------
// var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');

effectLevelPin.addEventListener('mouseup', function () {
  // var width = effectLevelLine.style.width;
  // var pinPosition = effectLevelPin.style.left;
  // не знаю пока как рассчитать положение ползунка
});

var onHashtagsValidation = function () {
  var hashtagsArray = textHashtags.value.split(' ');
  var firstCharInvalid = false;
  var longHashtag = false;
  var shortHashtag = false;
  var notLetterRegExp = /[^A-Za-zА-Яа-яЁё0-9]/;
  var notLetterInTag = false;
  var theSameTags = false;

  for (i = 0; i < hashtagsArray.length; i++) {
    var tagWithoutFirstChar = hashtagsArray[i].replace('#', '');
    if (hashtagsArray[i][0] !== '#' && textHashtags.value !== '') {
      firstCharInvalid = true;
    } else if (hashtagsArray[i].length > 20) {
      longHashtag = true;
    } else if (hashtagsArray[i].length < 2 && textHashtags.value !== '') {
      shortHashtag = true;
    } else if (notLetterRegExp.test(tagWithoutFirstChar)) {
      notLetterInTag = true;
    }

    var theSameTagsRegExp = new RegExp('^' + hashtagsArray[i] + '$', 'i');

    for (var j = i + 1; j < hashtagsArray.length; j++) {
      if (theSameTagsRegExp.test(hashtagsArray[j])) {
        theSameTags = true;
      }
    }
  }
  if (firstCharInvalid) {
    textHashtags.setCustomValidity('Первым символом в теге должна быть решетка #');
  } else if (longHashtag) {
    textHashtags.setCustomValidity('Хэш-тег не может превышать 20 символов');
  } else if (shortHashtag) {
    textHashtags.setCustomValidity('Хэш-тег не может состоять только из решетки #');
  } else if (notLetterInTag) {
    textHashtags.setCustomValidity('Хэш-теги не могут содержать спецсимволы и должны разделяться пробелами');
  } else if (hashtagsArray.length > 5) {
    textHashtags.setCustomValidity('Нельзя добавить более 5-ти хэш-тегов');
  } else if (theSameTags) {
    textHashtags.setCustomValidity('Нельзя добавить одинаковые хэш-теги');
  } else {
    textHashtags.setCustomValidity('');
  }

  textHashtags.addEventListener('input', function () {
    textHashtags.setCustomValidity('');
  });
};

textHashtags.addEventListener('change', onHashtagsValidation);
