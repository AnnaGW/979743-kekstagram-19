'use strict';

(function () {
  var messageConteiner = document.querySelector('main');

  var renderErrorGetting = function (errorMessage) {
    var errorWrap = document.createElement('div');
    errorWrap.classList.add('error-wrap');
    errorWrap.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorWrap);
  };

  var renderSuccessSending = function () {

    var messageTemplate = document.querySelector('#success').content;
    var newMessageTemplate = messageTemplate.querySelector('.success');

    var newMessage = newMessageTemplate.cloneNode(true);
    messageConteiner.appendChild(newMessage);
    // closing message
    var successMessage = document.querySelector('.success');

    var onSuccessMessageClose = function () {
      successMessage.remove();
      document.removeEventListener('keydown', onSuccessMessageEscPress);
    };

    var onSuccessMessageEscPress = function (evt) {
      if (evt.key === window.consts.ESC_KEY) {
        onSuccessMessageClose();
      }
    };

    successMessage.addEventListener('click', onSuccessMessageClose);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  var renderErrorSending = function () {
    var messageTemplate = document.querySelector('#error').content;
    var newMessageTemplate = messageTemplate.querySelector('.error');

    var newMessage = newMessageTemplate.cloneNode(true);
    messageConteiner.appendChild(newMessage);
    // closing message
    var errorMessage = document.querySelector('.error');

    var closeErrorMessage = function () {
      errorMessage.remove();
      document.removeEventListener('keydown', closeErrorMessageEscPress);
      window.uploadPhoto.onImgEditFormOpen();
    };

    var closeErrorMessageEscPress = function (evt) {
      if (evt.key === window.consts.ESC_KEY) {
        closeErrorMessage();
      }
    };

    errorMessage.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', closeErrorMessageEscPress);
  };

  window.messages = {
    renderErrorGetting: renderErrorGetting,
    renderSuccessSending: renderSuccessSending,
    renderErrorSending: renderErrorSending
  };
})();
