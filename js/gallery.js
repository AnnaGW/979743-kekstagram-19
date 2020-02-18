'use strict';

(function () {
  var photoConteiner = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content;
  var newPhotoTemplate = photoTemplate.querySelector('.picture');

  var onSuccessLoad = function (serverData) {
    for (var i = 0; i < serverData.length; i++) {
      createNewPhoto(serverData[i]);
    }
  };
  var onErrorLoad = function (errorMessage) {
    var errorWrap = document.createElement('div');
    errorWrap.classList.add('error-wrap');
    errorWrap.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorWrap);
  };

  window.server.download(onSuccessLoad, onErrorLoad);

  var createNewPhoto = function (photoItem) {
    var newPhoto = newPhotoTemplate.cloneNode(true);
    var newPhotoImg = newPhoto.querySelector('.picture__img');


    newPhotoImg.src = photoItem.url;
    var newPhotoLikes = newPhoto.querySelector('.picture__likes');
    newPhotoLikes.textContent = photoItem.likes;
    var newPhotoComments = newPhoto.querySelector('.picture__comments');
    newPhotoComments.textContent = photoItem.comments.length;
    photoConteiner.appendChild(newPhoto);
  };
})();
