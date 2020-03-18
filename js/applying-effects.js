'use strict';

(function () {

  var imgUploadPreview = document.querySelector('.img-upload__preview img ');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var chosen = {
    effect: ''
  };

  // обработчики клика, начальное значение уровня эффекта соотв-ет позиции ползунка 0.2
  var onEffectOriginalClick = function () {
    imgUploadPreview.classList.remove('effects__preview--chrome');
    imgUploadPreview.classList.remove('effects__preview--sepia');
    imgUploadPreview.classList.remove('effects__preview--marvin');
    imgUploadPreview.classList.remove('effects__preview--phobos');
    imgUploadPreview.classList.remove('effects__preview--heat');

    imgUploadPreview.style.filter = 'grayscale(0)';
    imgUploadPreview.style.filter = 'sepia(0)';
    imgUploadPreview.style.filter = 'invert(0)';
    imgUploadPreview.style.filter = 'blur(0)';
    imgUploadPreview.style.filter = 'brightness(1)';
    chosen.effect = '';
    imgUploadEffectLevel.classList.add('hidden');
  };

  var onEffectChromClick = function () {
    imgUploadPreview.classList.add('effects__preview--chrome');
    imgUploadPreview.style.filter = 'grayscale(20%)';
    chosen.effect = 'grayscale(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();

  };
  var onEffectSepiaClick = function () {
    imgUploadPreview.classList.add('effects__preview--sepia');
    imgUploadPreview.style.filter = 'sepia(20%)';
    chosen.effect = 'sepia(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();
  };
  var onEffectMarvinClick = function () {
    imgUploadPreview.classList.add('effects__preview--marvin');
    imgUploadPreview.style.filter = 'invert(20%)';
    chosen.effect = 'invert(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();
  };
  var onEffectFobosClick = function () {
    imgUploadPreview.classList.add('effects__preview--phobos');
    imgUploadPreview.style.filter = 'blur(0.6px)';
    chosen.effect = 'blur(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();
  };
  var onEffectHeatClick = function () {
    imgUploadPreview.classList.add('effects__preview--heat');
    imgUploadPreview.style.filter = 'brightness(1.4)';
    chosen.effect = 'brightness(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();
  };

  var effects = function (pinPosition, effect) {
    var effectDepth = 0;
    var tail = '';

    if (effect === 'blur(') {
      effectDepth = pinPosition * 3;
      tail = 'px)';
    } else if (effect === 'brightness(') {
      effectDepth = pinPosition * 2 + 1;
      tail = '';
    } else {
      effectDepth = Math.round(pinPosition * 100);
      tail = '%)';
    }
    var effectValue = effect + effectDepth + tail;
    imgUploadPreview.style.filter = effectValue;
  };

  window.applyingEffects = {
    onEffectOriginalClick: onEffectOriginalClick,
    onEffectChromClick: onEffectChromClick,
    onEffectSepiaClick: onEffectSepiaClick,
    onEffectMarvinClick: onEffectMarvinClick,
    onEffectFobosClick: onEffectFobosClick,
    onEffectHeatClick: onEffectHeatClick,
    effects: effects
  };
  window.chosen = chosen;
})();
