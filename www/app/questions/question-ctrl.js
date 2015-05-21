(function () {
  'use strict';
  angular.module('tebmap').controller('QuestionCtrl', ['$stateParams', 'tebmapApi', QuestionCtrl]);
  function QuestionCtrl($stateParams, tebmapApi) {
    var question = this;
    question.Id = Number($stateParams.Id);
    question.Url = 'http://www.alodoctor.ir/mobile/question/' + question.Id;
    tebmapApi.getQuestion(question.Id).then(function (data) {
      question.SearchTitle = data.Question.SearchTitle;
      question.Title = data.Question.Title;
      question.ClickCount = data.Question.ClickCount;
      question.Tags = data.Question.SelectedTags;
      question.Answer = data.Question.Answers[0].Description;
    });
  }
})();

