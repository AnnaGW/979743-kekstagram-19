'use strict';

(function () {
  var selectRandomFromArray = function (array) {
    var randomIndex = Math.floor(Math.random() * (array.length - 1) + 1);
    return array[randomIndex - 1];
  };

  window.util = {
    selectRandomFromArray: selectRandomFromArray,
  };
})();
