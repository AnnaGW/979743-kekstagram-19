'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentsList = document.querySelector('.social__comments');
  var newComment = document.querySelector('.social__footer-text');

  var socialComment = socialCommentsList.querySelector('.social__comment');

  var onFullsizeClose = function () {
    bigPicture.classList.add('hidden');
    var socialCommentItemsNew = socialCommentsList.querySelectorAll('.social__comment');
    for (var k = socialCommentItemsNew.length - 1; k > 0; k--) {
      socialCommentItemsNew[k].remove();
    }
    newComment.value = '';
    document.removeEventListener('keydown', onFullsizeEscPress);
    body.classList.remove('modal-open');
  };

  var onFullsizeEscPress = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      onFullsizeClose();
    }
  };

  var insertDataComment = function (element, commentData) {
    var socialCommentImg = element.querySelector('.social__picture');
    socialCommentImg.src = commentData.avatar;
    socialCommentImg.alt = commentData.name;
    var socialCommentText = element.querySelector('.social__text');
    socialCommentText.textContent = commentData.message;
  };

  var render = function (photoItem) {
    var bigPictureImg = document.querySelector('.big-picture__img img');
    bigPictureImg.src = photoItem.url;
    var likesСount = document.querySelector('.likes-count');
    likesСount.textContent = photoItem.likes;
    var commentsPublishedCount = document.querySelector('.comments-published');
    var commentsСount = document.querySelector('.comments-count');
    commentsСount.textContent = photoItem.comments.length;
    var socialCaption = document.querySelector('.social__caption');
    socialCaption.textContent = photoItem.description;

    commentsLoader.classList.remove('hidden');

    var commentsPublished = 0;

    if (photoItem.comments.length <= window.consts.COMMENTS_INSTALLMENT) {
      commentsPublished = photoItem.comments.length;
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderButton);
    } else {
      commentsPublished = window.consts.COMMENTS_INSTALLMENT;
    }
    commentsPublishedCount.textContent = commentsPublished;
    insertDataComment(socialComment, photoItem.comments[0]);
    for (var i = 1; i < commentsPublished; i++) {
      var nextComment = socialComment.cloneNode(true);
      insertDataComment(nextComment, photoItem.comments[i]);
      socialCommentsList.appendChild(nextComment);
    }
    var commentsQuantity = 0;

    var onCommentsLoaderButton = function () {
      var commentsBalance = photoItem.comments.length;
      commentsBalance = photoItem.comments.length - commentsPublished;

      if (commentsBalance <= window.consts.COMMENTS_INSTALLMENT) {
        commentsQuantity = photoItem.comments.length;
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', onCommentsLoaderButton);
      } else {
        commentsQuantity = commentsPublished + window.consts.COMMENTS_INSTALLMENT;
      }
      for (var j = commentsPublished; j < commentsQuantity; j++) {
        var additionalComment = socialComment.cloneNode(true);
        insertDataComment(additionalComment, photoItem.comments[j]);
        socialCommentsList.appendChild(additionalComment);
      }
      commentsPublished = commentsQuantity;
      commentsPublishedCount.textContent = commentsPublished;
    };

    commentsLoader.addEventListener('click', onCommentsLoaderButton);

    bigPicture.classList.remove('hidden');

    document.addEventListener('keydown', onFullsizeEscPress);
    bigPictureCancel.addEventListener('click', onFullsizeClose);
    newComment.addEventListener('focus', function () {
      document.removeEventListener('keydown', onFullsizeEscPress);
    });
    newComment.addEventListener('blur', function () {
      document.addEventListener('keydown', onFullsizeEscPress);
    });
    body.classList.add('modal-open');
  };

  window.fullSize = {
    render: render
  };

})();
