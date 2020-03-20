'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file'); // input type="file"
  var imgUploadPreview = document.querySelector('.img-upload__preview img');

  var load = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.consts.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgUploadPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.selectionFile = {
    load: load
  };
})();
