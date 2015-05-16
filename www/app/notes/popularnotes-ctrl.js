(function () {
	'use strict';
	angular.module('tebmap').controller('PopularNotesCtrl', ['$stateParams', '$scope', 'tebmapApi', PopularNotesCtrl]);

	function PopularNotesCtrl($stateParams, $scope, tebmapApi) {

		var popularnotes = this;
		popularnotes.ClinicId = Number($stateParams.clinicId);

		popularnotes.Notes = [];

		var initRequest = {
			ClinicId: popularnotes.ClinicId,
			Take: 10,
			Skip: 1,
			Term: "",
			Sort: "click",
			SortType: "desc"
		};
		$scope.hasMoreData = true;
		popularnotes.loadData = function () {
			if (popularnotes.Notes.length == 0) {
				console.log("First Request" + JSON.stringify(initRequest));
				tebmapApi.getPopularNotes(initRequest).then(function (data) {
					popularnotes.Notes = data.Notes;
					popularnotes.Take = data.Take;
					popularnotes.Skip = data.Skip;
					popularnotes.TotalItems = data.TotalItems;
					if (popularnotes.Notes == null||popularnotes.Notes.length===0) {
						$scope.hasMoreData = false;

					} else if (popularnotes.Notes != null) {
						$scope.hasMoreData = true;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					popularnotes.Skip = popularnotes.Skip + 1;
				});
			} else if (popularnotes.Notes.length > 0) {
				var noteRequest = {
					ClinicId: popularnotes.ClinicId,
					Take: initRequest.Take,
					Skip: popularnotes.Skip,
					Term: "",
					Sort: "click",
					SortType: "desc"
				};
				console.log("Other Request" + JSON.stringify(noteRequest));
				if (((noteRequest.Skip * noteRequest.Take) <= popularnotes.TotalItems)) {
					tebmapApi.getPopularNotes(noteRequest).then(function (data) {
						popularnotes.Notes = popularnotes.Notes.concat(data.Notes);
						popularnotes.Take = data.Take;
						popularnotes.Skip = data.Skip;
						popularnotes.TotalItems = data.TotalItems;
						$scope.$broadcast('scroll.infiniteScrollComplete');
						popularnotes.Skip = popularnotes.Skip + 1;
					});
				} else if (((noteRequest.Skip * noteRequest.Take) >= popularnotes.TotalItems)) {
					$scope.hasMoreData = false;
				}
			}
		};

		popularnotes.doRefresh = function () {
			console.log("Refresh Request : " + JSON.stringify(initRequest));
			tebmapApi.getPopularNotes(initRequest).then(function (data) {
				popularnotes.Notes = data.Notes;
				popularnotes.Take = data.Take;
				popularnotes.Skip = data.Skip;
				popularnotes.TotalItems = data.TotalItems;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
	};
})();
