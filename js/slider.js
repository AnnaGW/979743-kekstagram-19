'use strict';

(function () {

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
  var pinPosition = 0.2;

  effectLevelPin.addEventListener('mousedown', function (evt) {
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
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      pinPosition = effectLevelPin.offsetLeft / effectLevelLine.offsetWidth;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = {
    pinPosition: pinPosition
  };
})();
