(function () {
  'use strict';
  angular.module('tebmap').controller('QuestionCtrl', ['$stateParams', QuestionCtrl]);
  function QuestionCtrl($stateParams) {
    var question = this;
    question.Id = Number($stateParams.Id);
    question.Url = 'http://www.alodoctor.ir/mobile/question/' + question.Id;
    /*question.Url = window.open(question.Url, "_self", 'hidden=yes');*/
  }
})();
