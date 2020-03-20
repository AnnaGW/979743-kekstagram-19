'use strict';

(function () {

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json'; // !!!
    xhr.open('GET', window.consts.URL_GET);

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
    xhr.timeout = window.consts.TIMEOUT_DOWNLOAD_ERRORR;

    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = window.consts.TIMEOUT_DOWNLOAD_ERRORR;

    xhr.open('POST', window.consts.URL_POST);
    xhr.send(data);
  };

  window.server = {
    download: download,
    upload: upload
  };
})();
