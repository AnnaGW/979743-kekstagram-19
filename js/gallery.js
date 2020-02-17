'use strict';

(function () {
  var photoConteiner = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content;
  var newPhotoTemplate = photoTemplate.querySelector('.picture');

  var createNewPhoto = function (photoIndex) {
    var newPhoto = newPhotoTemplate.cloneNode(true);
    var newPhotoImg = newPhoto.querySelector('.picture__img');
    var data = window.creationData.get();

    newPhotoImg.src = data[photoIndex].url;
    var newPhotoLikes = newPhoto.querySelector('.picture__likes');
    newPhotoLikes.textContent = data[photoIndex].likes;
    var newPhotoComments = newPhoto.querySelector('.picture__comments');
    newPhotoComments.textContent = data[photoIndex].comments.length;
    photoConteiner.appendChild(newPhoto);
  };

  for (var i = 1; i <= window.consts.PHOTOS_QUANTITY; i++) {
    createNewPhoto(i - 1);
  }
})();
