'use strict';

(function () {

  var imgUploadPreview = document.querySelector('.img-upload__preview img ');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var chosen = {
    effect: ''
  };
  var leadToEffectNone = function () {
    imgUploadPreview.classList.remove('effects__preview--chrome');
    imgUploadPreview.classList.remove('effects__preview--sepia');
    imgUploadPreview.classList.remove('effects__preview--marvin');
    imgUploadPreview.classList.remove('effects__preview--phobos');
    imgUploadPreview.classList.remove('effects__preview--heat');
    imgUploadPreview.removeAttribute('style');
  };

  var onEffectOriginalClick = function () {
    leadToEffectNone();
    chosen.effect = '';
    imgUploadEffectLevel.classList.add('hidden');
  };

  var onEffectChromClick = function () {
    leadToEffectNone();
    imgUploadPreview.classList.add('effects__preview--chrome');
    chosen.effect = 'grayscale(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();

  };
  var onEffectSepiaClick = function () {
    leadToEffectNone();
    imgUploadPreview.classList.add('effects__preview--sepia');
    chosen.effect = 'sepia(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();
  };
  var onEffectMarvinClick = function () {
    leadToEffectNone();
    imgUploadPreview.classList.add('effects__preview--marvin');
    chosen.effect = 'invert(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();
  };
  var onEffectFobosClick = function () {
    leadToEffectNone();
    imgUploadPreview.classList.add('effects__preview--phobos');
    chosen.effect = 'blur(';
    effectLevelValue.value = Math.round(window.consts.START_PIN_POSITION * 100).toString();
    imgUploadEffectLevel.classList.remove('hidden');
    window.slider.resetPinPosition();
  };
  var onEffectHeatClick = function () {
    leadToEffectNone();
    imgUploadPreview.classList.add('effects__preview--heat');
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
    leadToEffectNone: leadToEffectNone,
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
