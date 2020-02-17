'use strict';

(function () {
  var EFFECTS_QUANTITY = 6;
  var START_PIN_POSITION = '20%';
  var effectsList = document.querySelectorAll('.effects__preview'); // spans

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

  for (var i = 0; i < EFFECTS_QUANTITY; i++) {
    var effect = effectsList.item(i);
    effect.addEventListener('focus', function () {
      effectLevelPin.style.left = START_PIN_POSITION;
      effectLevelDepth.style.width = START_PIN_POSITION;
    });
  }

})();
