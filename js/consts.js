'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;
  var RANDOM_PHOTOS_QUANTITY = 10;
  var ESC_KEY = 'Escape';
  var TIMEOUT_DOWNLOAD_ERRORR = 4000;
  var DEBOUNCE_INTERVAL = 500; // ms
  var COMMENTS_INSTALLMENT = 5;
  var EFFECTS_QUANTITY = 6;
  var START_PIN_POSITION = 1;
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  window.consts = {
    PHOTOS_QUANTITY: PHOTOS_QUANTITY,
    RANDOM_PHOTOS_QUANTITY: RANDOM_PHOTOS_QUANTITY,
    ESC_KEY: ESC_KEY,
    TIMEOUT_DOWNLOAD_ERRORR: TIMEOUT_DOWNLOAD_ERRORR,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    COMMENTS_INSTALLMENT: COMMENTS_INSTALLMENT,
    EFFECTS_QUANTITY: EFFECTS_QUANTITY,
    START_PIN_POSITION: START_PIN_POSITION,
    URL_GET: URL_GET,
    URL_POST: URL_POST
  };
})();
