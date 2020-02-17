'use strict';

(function () {
  // открытие / закрытие диалогового окна загрузки изображения
  var uploadFile = document.querySelector('#upload-file');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var imgEditFormCancel = imgEditForm.querySelector('.img-upload__cancel');
  var textHashtags = document.querySelector('.text__hashtags');

  var onImgEditFormEscPress = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      closeImgEditForm();
    }
  };

  var openImgEditForm = function () {
    imgEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onImgEditFormEscPress);
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
})();
