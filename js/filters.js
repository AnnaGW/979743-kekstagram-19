'use strict';

(function () {
  var defaultPhoto = function (allData) {
    var filteredData = allData;
    return filteredData;
  };

  var randomPhoto = function (allData) {
    var filteredData = [];
    var indexArray = [];
    for (var i = 0; i < window.consts.PHOTOS_QUANTITY; i++) {
      indexArray.push(i);
    }
    window.util.shuffle(indexArray);

    for (var j = 0; j < window.consts.RANDOM_PHOTOS_QUANTITY; j++) {
      var randomIndex = indexArray[j];
      filteredData.push(allData[randomIndex]);
    }

    return filteredData;
  };

  var discussedPhoto = function (allData) {
    var filteredData = [];
    var sortedArray = allData.map(function (dataItem, index) {
      return {
        commentsQuantity: dataItem.comments.length,
        index: index
      };
    });

    sortedArray.sort(function (first, second) {
      if (first.commentsQuantity > second.commentsQuantity) {
        return -1;
      } else if (first.commentsQuantity < second.commentsQuantity) {
        return 1;
      } else {
        return 0;
      }
    });

    for (var i = 0; i < allData.length; i++) {
      var sortedIndex = sortedArray[i].index;
      filteredData.push(allData[sortedIndex]);
    }

    return filteredData;
  };

  window.filters = {
    discussedPhoto: discussedPhoto,
    defaultPhoto: defaultPhoto,
    randomPhoto: randomPhoto
  };
})();
