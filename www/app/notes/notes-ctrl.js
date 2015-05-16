(function () {
	'use strict';
	angular.module('tebmap').controller('NotesCtrl', ['$stateParams', '$scope', 'tebmapApi', NotesCtrl]);
	function NotesCtrl($stateParams, $scope, tebmapApi) {
		var notes = this;
		notes.ClinicId = Number($stateParams.clinicId);

		notes.Notes = [];

		var initRequest = {
			ClinicId: notes.ClinicId,
			Take: 10,
			Skip: 1,
			Term: "",
			Sort: "",
			SortType: "desc"
		};
		$scope.hasMoreData = true;
		notes.loadData = function () {
			if (notes.Notes.length == 0) {
				console.log("First Request" + JSON.stringify(initRequest));
				tebmapApi.getNotes(initRequest).then(function (data) {
					notes.Notes = data.Notes;
					notes.Take = data.Take;
					notes.Skip = data.Skip;
					notes.TotalItems = data.TotalItems;
					if (notes.Notes == null||notes.Notes.length===0) {
						console.log("False");
						$scope.hasMoreData = false;

					} else if (notes.Notes != null) {
						console.log("True");
						$scope.hasMoreData = true;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					notes.Skip = notes.Skip + 1;
				});
			} else if (notes.Notes.length > 0) {
				var noteRequest = {
					ClinicId: notes.ClinicId,
					Take: initRequest.Take,
					Skip: notes.Skip,
					Term: "",
					Sort: "",
					SortType: "desc"
				};
				console.log("Other Request" + JSON.stringify(noteRequest));
				if (((noteRequest.Skip * noteRequest.Take) <= notes.TotalItems)) {
					tebmapApi.getNotes(noteRequest).then(function (data) {
						notes.Notes = notes.Notes.concat(data.Notes);
						notes.Take = data.Take;
						notes.Skip = data.Skip;
						notes.TotalItems = data.TotalItems;
						$scope.$broadcast('scroll.infiniteScrollComplete');
						notes.Skip = notes.Skip + 1;
					});
				} else if (((noteRequest.Skip * noteRequest.Take) >= notes.TotalItems)) {
					$scope.hasMoreData = false;
				}
			}
		};

		notes.doRefresh = function () {
			console.log("Refresh Request : " + JSON.stringify(initRequest));
			tebmapApi.getNotes(initRequest).then(function (data) {
				notes.Notes = data.Notes;
				notes.Take = data.Take;
				notes.Skip = data.Skip;
				notes.TotalItems = data.TotalItems;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
	}
})();
