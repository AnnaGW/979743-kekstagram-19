'use strict';

(function () {

  var defaultPhotoButton = document.querySelector('#filter-default');
  var randomPhotoButton = document.querySelector('#filter-random');
  var discussedPhotoButton = document.querySelector('#filter-discussed');

  var allDataCopy = [];

  var onSuccessLoad = function (serverData) {
    allDataCopy = serverData;
    for (var i = 0; i < serverData.length; i++) {
      window.photo.create(serverData[i]);
    }
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };

  var onErrorLoad = function (errorMessage) {
    var errorWrap = document.createElement('div');
    errorWrap.classList.add('error-wrap');
    errorWrap.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorWrap);
  };

  window.server.download(onSuccessLoad, onErrorLoad);
  // -----------------------------------------------------------------
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
