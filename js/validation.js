'use strict';

(function () {
  // Hashtags validation
  var textHashtags = document.querySelector('.text__hashtags');

  var onHashtagsValidation = function () {
    var hashtagsArray = textHashtags.value.split(' ');
    var firstCharInvalid = false;
    var longHashtag = false;
    var shortHashtag = false;
    var notLetterRegExp = /[^A-Za-zА-Яа-яЁё0-9]/;
    var notLetterInTag = false;
    var theSameTags = false;

    for (var i = 0; i < hashtagsArray.length; i++) {
      var tagWithoutFirstChar = hashtagsArray[i].replace('#', '');
      if (hashtagsArray[i][0] !== '#' && textHashtags.value !== '') {
        firstCharInvalid = true;
      } else if (hashtagsArray[i].length > 20) {
        longHashtag = true;
      } else if (hashtagsArray[i].length < 2 && textHashtags.value !== '') {
        shortHashtag = true;
      } else if (notLetterRegExp.test(tagWithoutFirstChar)) {
        notLetterInTag = true;
      }

      var theSameTagsRegExp = new RegExp('^' + hashtagsArray[i] + '$', 'i');

      for (var j = i + 1; j < hashtagsArray.length; j++) {
        if (theSameTagsRegExp.test(hashtagsArray[j])) {
          theSameTags = true;
        }
      }
    }
    if (firstCharInvalid) {
      textHashtags.setCustomValidity('Первым символом в теге должна быть решетка #');
      textHashtags.classList.add('js-invalid-input');
    } else if (longHashtag) {
      textHashtags.setCustomValidity('Хэш-тег не может превышать 20 символов');
      textHashtags.classList.add('js-invalid-input');
    } else if (shortHashtag) {
      textHashtags.setCustomValidity('Хэш-тег не может состоять только из решетки #');
      textHashtags.classList.add('js-invalid-input');
    } else if (notLetterInTag) {
      textHashtags.setCustomValidity('Хэш-теги не могут содержать спецсимволы и должны разделяться пробелами');
      textHashtags.classList.add('js-invalid-input');
    } else if (hashtagsArray.length > 5) {
      textHashtags.setCustomValidity('Нельзя добавить более 5-ти хэш-тегов');
      textHashtags.classList.add('js-invalid-input');
    } else if (theSameTags) {
      textHashtags.setCustomValidity('Нельзя добавить одинаковые хэш-тега');
      textHashtags.classList.add('js-invalid-input');
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('js-invalid-input');
    }

    textHashtags.addEventListener('input', function () {
      textHashtags.setCustomValidity('');
    });
  };

  textHashtags.addEventListener('change', onHashtagsValidation);

  // Comment validation
  var textComment = document.querySelector('.social__footer-text');
  var onCommentValidation = function () {
    if (textComment.validity.tooLong) {
      textComment.setCustomValidity('Комментарий не должен содержать более 140 символов');
      textComment.classList.add('js-invalid-input');
    }
  };

  textComment.addEventListener('invalid', onCommentValidation);
})();
