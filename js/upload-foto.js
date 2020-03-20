'use strict';

(function () {

  // открытие / закрытие диалогового окна загрузки изображения
  var body = document.querySelector('body');
  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('#upload-file');
  // var imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
  var imgEditForm = imgUpload.querySelector('.img-upload__overlay');
  var imgEditFormCancel = imgEditForm.querySelector('.img-upload__cancel');
  var textHashtags = imgUpload.querySelector('.text__hashtags'); // input
  var textDescription = imgUpload.querySelector('.text__description'); // textarea
  var effectLevelLine = imgUpload.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin'); // div
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var effectLevelValue = imgUpload.querySelector('.effect-level__value'); // input
  var effectsList = imgUpload.querySelectorAll('.effects__radio'); // inputs
  var effects = imgUpload.querySelectorAll('input[name=effect]'); // inputs radio
  var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller'); // button
  var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');// button
  var scaleControlValue = imgUpload.querySelector('.scale__control--value'); // input

  var closeImgEditForm = function () {
    imgEditForm.classList.add('hidden');
    window.applyingEffects.leadToEffectNone();
    uploadFile.value = '';
    scaleControlValue.value = '100%';
    effectLevelValue.value = '20';
    window.slider.resetPinPosition();
    effects[0].checked = true;
    for (var i = 1; i < effects.length; i++) {
      effects[i].checked = false;
    }
    textHashtags.value = '';
    textDescription.value = '';
    effectLevelPin.style.left = '20%';
    effectLevelDepth.style.width = '20%';

    document.removeEventListener('keydown', onImgEditFormEscPress);
    effectLevelPin.addEventListener('mousedown', window.slider.onMouseDown);
    effectsList.item(0).removeEventListener('click', window.applyingEffects.onEffectOriginalClick);
    effectsList.item(1).removeEventListener('click', window.applyingEffects.onEffectChromClick);
    effectsList.item(2).removeEventListener('click', window.applyingEffects.onEffectSepiaClick);
    effectsList.item(3).removeEventListener('click', window.applyingEffects.onEffectMarvinClick);
    effectsList.item(4).removeEventListener('click', window.applyingEffects.onEffectFobosClick);
    effectsList.item(5).removeEventListener('click', window.applyingEffects.onEffectHeatClick);

    body.classList.remove('modal-open');
  };

  var onImgEditFormEscPress = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      closeImgEditForm();
    }
  };

  var openImgEditForm = function () {

    imgEditForm.classList.remove('hidden');

    imgEditFormCancel.addEventListener('click', closeImgEditForm);
    document.addEventListener('keydown', onImgEditFormEscPress);
    textHashtags.addEventListener('focus', function () {
      document.removeEventListener('keydown', onImgEditFormEscPress);
    });
    textHashtags.addEventListener('blur', function () {
      document.addEventListener('keydown', onImgEditFormEscPress);
    });
    // ---------------- масштабирование -----------------------
    scaleControlSmaller.addEventListener('click', window.scale.onScaleSmallerClick);

    scaleControlBigger.addEventListener('click', window.scale.onScaleBiggerClick);

    // ---------------- применение эффектов -----------------------

    effectLevelPin.addEventListener('mousedown', window.slider.onMouseDown);

    // ----- слушаем события нажатия на иконку эффекта
    effectsList.item(0).addEventListener('click', window.applyingEffects.onEffectOriginalClick);

    effectsList.item(1).addEventListener('click', window.applyingEffects.onEffectChromClick);

    effectsList.item(1).addEventListener('click', window.applyingEffects.onEffectChromClick);

    effectsList.item(2).addEventListener('click', window.applyingEffects.onEffectSepiaClick);

    effectsList.item(3).addEventListener('click', window.applyingEffects.onEffectMarvinClick);

    effectsList.item(4).addEventListener('click', window.applyingEffects.onEffectFobosClick);

    effectsList.item(5).addEventListener('click', window.applyingEffects.onEffectHeatClick);

    body.classList.add('modal-open');
  }; // end of openImgEditForm

  uploadFile.addEventListener('change', openImgEditForm);

  // --------------обработчики отправки данных на сервер
  var onSuccessSend = function () {
    closeImgEditForm();
    window.messages.renderSuccessSending();
  };
  var onErrorSend = function () {
    closeImgEditForm();
    window.messages.renderErrorSending();
  };

  var form = imgUpload.querySelector('#upload-select-image');
  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), onSuccessSend, onErrorSend);
    evt.preventDefault();
  });

  window.uploadPhoto = {
    openImgEditForm: openImgEditForm
  };
})();
