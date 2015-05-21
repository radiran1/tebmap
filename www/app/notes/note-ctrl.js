(function () {
  'use strict';
  angular.module('tebmap').controller('NoteCtrl', ['$stateParams', 'tebmapApi', NoteCtrl]);
  function NoteCtrl($stateParams, tebmapApi) {
    var note = this;

    note.Id = Number($stateParams.Id);
    var imageUrl = "http://www.alodoctor.ir/Uploads/Picture/";
    tebmapApi.getNote(note.Id).then(function (data) {
      note.Name = data.Note.Name;
      note.Description = data.Note.Description;
      note.Body = data.Note.Body;
      note.ClickCount = data.Note.ClickCount;
      note.Tags = data.Tags;
      note.Image = imageUrl + data.Note.Contents[0].FileName;
    });
  }
})();
