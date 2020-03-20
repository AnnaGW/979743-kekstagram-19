'use strict';

(function () {

  var defaultPhotoButton = document.querySelector('#filter-default');
  var randomPhotoButton = document.querySelector('#filter-random');
  var discussedPhotoButton = document.querySelector('#filter-discussed');

  var allDataCopy = [];

  var picturesContainer = document.querySelector('.pictures'); // родитель
  var miniatures; // коллекция миниатюр

  var onFullsizeClick = function (evt) {
    var targetElement = evt.target;
    for (var j = 0; j < miniatures.length; j++) {
      if (miniatures[j].src === targetElement.src) {
        var targetIndex = j;
        break;
      }
    }
    if (targetIndex < 25) {
      window.fullSize.fullsize(allDataCopy[targetIndex]);
    }
  };

  var onSuccessLoad = function (serverData) {
    allDataCopy = serverData;
    for (var i = 0; i < serverData.length; i++) {
      window.photo.create(serverData[i]);
    }
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    miniatures = document.querySelectorAll('.picture__img'); // коллекция миниатюр
    picturesContainer.addEventListener('click', onFullsizeClick);

  };

  var onErrorLoad = function (errorMessage) {
    window.messages.renderErrorGetting(errorMessage);
  };

  window.server.download(onSuccessLoad, onErrorLoad);
  // ------------фильтры-----------------------------------------------------
  var onDefaultPhotoButton = function () {
    discussedPhotoButton.classList.remove('img-filters__button--active');
    randomPhotoButton.classList.remove('img-filters__button--active');
    defaultPhotoButton.classList.add('img-filters__button--active');

    window.util.debounce(function () {
      window.photo.update(window.filters.defaultPhoto(allDataCopy));
    });
  };

  var onRandomPhotoButton = function () {
    defaultPhotoButton.classList.remove('img-filters__button--active');
    discussedPhotoButton.classList.remove('img-filters__button--active');
    randomPhotoButton.classList.add('img-filters__button--active');

    window.util.debounce(function () {
      window.photo.update(window.filters.randomPhoto(allDataCopy));
    });
  };

  var onDiscussedPhotoButton = function () {
    defaultPhotoButton.classList.remove('img-filters__button--active');
    randomPhotoButton.classList.remove('img-filters__button--active');
    discussedPhotoButton.classList.add('img-filters__button--active');

    window.util.debounce(function () {
      window.photo.update(window.filters.discussedPhoto(allDataCopy));
    });
  };

  defaultPhotoButton.addEventListener('click', onDefaultPhotoButton);
  randomPhotoButton.addEventListener('click', onRandomPhotoButton);
  discussedPhotoButton.addEventListener('click', onDiscussedPhotoButton);

})();
