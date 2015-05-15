(function () {
	'use strict';
	angular.module('tebmap').controller('QuestionsCtrl', ['$stateParams', '$scope', 'tebmapApi', QuestionsCtrl]);
	function QuestionsCtrl($stateParams, $scope, tebmapApi) {
		var questions = this;
		questions.ClinicId = Number($stateParams.clinicId);

		questions.Questions = [];

		var initRequest = {
			ClinicId: questions.ClinicId,
			Take: 10,
			Skip: 1,
			Term: "",
			Sort: "",
			SortType: "desc"
		};

		questions.loadData = function () {
			if (questions.Questions.length == 0) {
				console.log("First Request" + JSON.stringify(initRequest));
				tebmapApi.getQuestions(initRequest).then(function (data) {
					questions.Questions = data.Questions;
					questions.Take = data.Take;
					questions.Skip = data.Skip;
					questions.TotalItems = data.TotalItems;
					$scope.$broadcast('scroll.infiniteScrollComplete');
					questions.Skip = questions.Skip + 1;
				});
			} else if (questions.Questions.length > 0) {
				var questionRequest = {
					ClinicId: questions.ClinicId,
					Take: initRequest.Take,
					Skip: questions.Skip,
					Term: "",
					Sort: "",
					SortType: "desc"
				};
				console.log("Other Request" + JSON.stringify(questionRequest));
				if (((questionRequest.Skip * questionRequest.Take) <= questions.TotalItems)) {
					tebmapApi.getQuestions(questionRequest).then(function (data) {
						questions.Questions = questions.Questions.concat(data.Questions);
						questions.Take = data.Take;
						questions.Skip = data.Skip;
						questions.TotalItems = data.TotalItems;
						$scope.$broadcast('scroll.infiniteScrollComplete');
						questions.Skip = questions.Skip + 1;
					});
				}
			}
		};

		questions.doRefresh = function () {
			console.log("Refresh Request : " + JSON.stringify(initRequest));
			tebmapApi.getQuestions(initRequest).then(function (data) {
				questions.Questions = data.Questions;
				questions.Take = data.Take;
				questions.Skip = data.Skip;
				questions.TotalItems = data.TotalItems;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
	}
})();
