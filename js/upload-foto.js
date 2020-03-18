'use strict';

(function () {

  // открытие / закрытие диалогового окна загрузки изображения
  var uploadFile = document.querySelector('#upload-file');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var imgEditFormCancel = imgEditForm.querySelector('.img-upload__cancel');
  var textHashtags = document.querySelector('.text__hashtags');
  var chosenEffect = 'empty';
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin'); // div
  var effectsList = document.querySelectorAll('.effects__radio'); // input's
  var scaleControlSmaller = document.querySelector('.scale__control--smaller'); // button
  var scaleControlBigger = document.querySelector('.scale__control--bigger');// button

  var closeImgEditForm = function () {
    imgEditForm.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onImgEditFormEscPress);
    // снять прослушку всех событий
    effectLevelPin.addEventListener('mousedown', window.slider.onMouseDown);
    effectsList.item(0).removeEventListener('click', window.applyingEffects.onEffectOriginalClick);
    effectsList.item(1).removeEventListener('click', window.applyingEffects.onEffectChromClick);
    effectsList.item(2).removeEventListener('click', window.applyingEffects.onEffectSepiaClick);
    effectsList.item(3).removeEventListener('click', window.applyingEffects.onEffectMarvinClick);
    effectsList.item(4).removeEventListener('click', window.applyingEffects.onEffectFobosClick);
    effectsList.item(5).removeEventListener('click', window.applyingEffects.onEffectHeatClick);
  };

  var onImgEditFormEscPress = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      closeImgEditForm();
    }
  };

  var openImgEditForm = function () {
    imgEditForm.classList.remove('hidden');
    // window.applyingEffects.onEffectOriginalClick(); //нужно ли при открытии окна запускать выбор "без эффекта"

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

    // ----слушаем событие нажатия мышкой на ползунок
    effectLevelPin.addEventListener('mousedown', window.slider.onMouseDown);

    // ----- слушаем события нажатия на иконку эффекта
    effectsList.item(0).addEventListener('click', window.applyingEffects.onEffectOriginalClick);

    effectsList.item(1).addEventListener('change', window.applyingEffects.onEffectChromClick);

    effectsList.item(1).addEventListener('click', window.applyingEffects.onEffectChromClick);

    effectsList.item(2).addEventListener('click', window.applyingEffects.onEffectSepiaClick);

    effectsList.item(3).addEventListener('click', window.applyingEffects.onEffectMarvinClick);

    effectsList.item(4).addEventListener('click', window.applyingEffects.onEffectFobosClick);

    effectsList.item(5).addEventListener('click', window.applyingEffects.onEffectHeatClick);
  };

  uploadFile.addEventListener('change', openImgEditForm);

  // imgEditFormCancel.addEventListener('click', closeImgEditForm);

  window.uploadPhoto = {
    chosenEffect: chosenEffect
  };
})();
