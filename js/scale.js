'use strict';

(function () {
  var scaleControlValue = document.querySelector('.scale__control--value'); // input
  var imgUploadPreview = document.querySelector('.img-upload__preview img ');

  var onScaleSmallerClick = function () {
    // сначала отрезать символ %
    var startSizeStr = scaleControlValue.value.replace('%', '');
    var startSize = Number(startSizeStr);
    if (startSize > 25) {
      var newSize = startSize - 25;
    } else {
      newSize = startSize;
    }
    var transform = 'scale(' + newSize / 100 + ')';
    imgUploadPreview.style.transform = transform;
    scaleControlValue.value = String(newSize) + '%';
    startSize = newSize;
  };
  var onScaleBiggerClick = function () {
    // сначала отрезать символ %
    var startSizeStr = scaleControlValue.value.replace('%', '');
    var startSize = Number(startSizeStr);
    if (startSize < 100) {
      var newSize = startSize + 25;
    } else {
      newSize = startSize;
    }
    var transform = 'scale(' + newSize / 100 + ')';
    imgUploadPreview.style.transform = transform;
    scaleControlValue.value = String(newSize) + '%';
    startSize = newSize;
  };

  window.scale = {
    onScaleSmallerClick: onScaleSmallerClick,
    onScaleBiggerClick: onScaleBiggerClick
  };
})();
