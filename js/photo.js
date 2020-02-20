'use strict';

(function () {
  var photoConteiner = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content;
  var newPhotoTemplate = photoTemplate.querySelector('.picture');

  var create = function (photoItem) {
    var newPhoto = newPhotoTemplate.cloneNode(true);
    var newPhotoImg = newPhoto.querySelector('.picture__img');

    newPhotoImg.src = photoItem.url;
    var newPhotoLikes = newPhoto.querySelector('.picture__likes');
    newPhotoLikes.textContent = photoItem.likes;
    var newPhotoComments = newPhoto.querySelector('.picture__comments');
    newPhotoComments.textContent = photoItem.comments.length;
    photoConteiner.appendChild(newPhoto);
  };

  var remove = function () {
    var oldPhotos = document.querySelectorAll('.picture');
    oldPhotos.forEach(function (element) {
      element.remove();
    });

  };
  var update = function (selectPhoto) {
    var filteredData = selectPhoto;
    window.photo.remove();
    for (var i = 0; i < filteredData.length; i++) {
      window.photo.create(filteredData[i]);
    }
  };

  window.photo = {
    create: create,
    remove: remove,
    update: update
  };
})();
