(function () {
  'use strict';
  angular.module('tebmap').controller('NoteCtrl', ['$stateParams', NoteCtrl]);
  function NoteCtrl($stateParams) {
    var note = this;
    note.Id = Number($stateParams.Id);
  }
})();
