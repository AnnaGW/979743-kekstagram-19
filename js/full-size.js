'use strict';
 //var firstPhotoItem =

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentsList = document.querySelector('.social__comments'); // список
  //var socialCommentItemExist =  socialComments.querySelectorAll('.social__comment'); // коллекция элементов li

  //исходим из предположения, что есть хотябы один комментарий
  var socialComment =  socialCommentsList.querySelector('.social__comment'); // существующий в верстке элемент li

  var closeFullsize = function () {
      bigPicture.classList.add('hidden');
      // удаляем созданные li
      var socialCommentItemsNew =  socialCommentsList.querySelectorAll('.social__comment'); // коллекция элементов li
      console.log('socialCommentItemsNew.length ' + socialCommentItemsNew.length);
      for (var k = socialCommentItemsNew.length - 1; k > 0; k--) {
        socialCommentItemsNew[k].remove(); // удаляем все, кроме первого
      }
      document.removeEventListener('keydown', onFullsizeEscPress);
      body.classList.remove('modal-open');
  };

  var onFullsizeEscPress = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      closeFullsize();
    }
  };

  var insertDataComment = function (element, commentData) {
    var socialCommentImg = element.querySelector('.social__picture');
    socialCommentImg.src = commentData.avatar;
    socialCommentImg.alt = commentData.name;
    var socialCommentText = element.querySelector('.social__text');
    socialCommentText.textContent = commentData.message;
  };

  var fullsize = function (photoItem) {
    //debugger;
    var bigPictureImg = document.querySelector('.big-picture__img img');
    bigPictureImg.src = photoItem.url;
    var likesСount = document.querySelector('.likes-count');
    likesСount.textContent = photoItem.likes;
    var commentsPublishedCount = document.querySelector('.comments-published');
    var commentsСount = document.querySelector('.comments-count');
    commentsСount.textContent = photoItem.comments.length;
    var socialCaption = document.querySelector('.social__caption');
    socialCaption.textContent = photoItem.description;
    console.log('photoItem.comments');
    console.log(photoItem.comments);
    //вставка комментариев

    commentsLoader.classList.remove('hidden');

    var commentsPublished = 0; // кол-во опубликованных комментов
    console.log('fullsize function is runing')
    if (photoItem.comments.length <= window.consts.COMMENTS_INSTALLMENT) {
      commentsPublished = photoItem.comments.length;
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderButton);
    } else {
      commentsPublished = window.consts.COMMENTS_INSTALLMENT;
    }
    commentsPublishedCount.textContent = commentsPublished;
    //вставка первого комментария в существ верстку
    insertDataComment(socialComment, photoItem.comments[0]);
    //вставка следующих 4 комментариев, отображаемых сразу
    for (var i = 1; i < commentsPublished; i++) {
      var nextComment = socialComment.cloneNode(true);
      insertDataComment(nextComment, photoItem.comments[i]);
      socialCommentsList.appendChild(nextComment);
    }
    var commentsQuantity = 0; // промежуточное значение

    var onCommentsLoaderButton = function () {
      var commentsBalance = photoItem.comments.length;
       commentsBalance = photoItem.comments.length - commentsPublished;// кол-во оставшихся комментариев
      console.log('commentsBalance ' + commentsBalance);
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
      //commentsLoader.classList.remove('hidden');

      console.log('commentsQuantity ' + commentsQuantity);

    };

    commentsLoader.addEventListener('click', onCommentsLoaderButton);

    bigPicture.classList.remove('hidden');

    //закрытие
    document.addEventListener('keydown', onFullsizeEscPress);
    bigPictureCancel.addEventListener('click', closeFullsize);
    body.classList.add('modal-open');
  };



window.fullSize = {
  fullsize: fullsize
};

})();
