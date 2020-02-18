'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // !!!
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'с');
    });
    xhr.timeout = 2000; // 2s

    xhr.send();
  };

  window.server = {
    download: download
  };
})();
