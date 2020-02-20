'use strict';

(function () {
  var selectRandomFromArray = function (array) {
    var randomIndex = Math.floor(Math.random() * (array.length - 1) + 1);
    return array[randomIndex - 1];
  };

  var shuffle = function (array) {
    var j;
    var swap;

    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      swap = array[j];
      array[j] = array[i];
      array[i] = swap;
    }
    return array;
  };

  var lastTimeout;
  var debounce = function (someFunc) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(someFunc, window.consts.DEBOUNCE_INTERVAL);
  };

  window.util = {
    selectRandomFromArray: selectRandomFromArray,
    shuffle: shuffle,
    debounce: debounce
  };
})();
