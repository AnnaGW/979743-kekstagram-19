'use strict';

(function () {

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value'); // input

  var pinPosition = 0.2;
  var chosenEffect = 'empty';

  // сбрасываем положение ползунка при смене эффекта
  var resetPinPosition = function () {
    effectLevelPin.style.left = String(window.consts.START_PIN_POSITION * 100) + '%';
    effectLevelDepth.style.width = String(window.consts.START_PIN_POSITION * 100) + '%';
  };

  var onMouseDown = function (evt) {
    chosenEffect = window.chosen.effect;
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;

      startCoordX = moveEvt.clientX;

      if (effectLevelPin.offsetLeft - shiftX <= 0) {
        effectLevelPin.style.left = 0;
        effectLevelDepth.style.width = 0;
      } else if (effectLevelPin.offsetLeft - shiftX > effectLevelLine.offsetWidth) {
        effectLevelPin.style.left = '100%';
        effectLevelDepth.style.width = effectLevelLine.offsetWidth;
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shiftX) + 'px';
        effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shiftX) + 'px';
        pinPosition = effectLevelPin.offsetLeft / effectLevelLine.offsetWidth; // от 0 до 1

        if (chosenEffect !== '') {
          window.applyingEffects.effects(pinPosition, chosenEffect);
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      effectLevelValue.value = Math.round(pinPosition * 100).toString();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.slider = {
    onMouseDown: onMouseDown,
    resetPinPosition: resetPinPosition
  };
})();
