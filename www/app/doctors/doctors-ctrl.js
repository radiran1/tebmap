(function () {
	'use strict';
	angular.module('tebmap').controller('DoctorsCtrl', ['$stateParams', '$scope', 'tebmapApi', DoctorsCtrl]);
	function DoctorsCtrl($stateParams, $scope, tebmapApi) {
		var doctors = this;
		doctors.ClinicId = Number($stateParams.clinicId);
		doctors.Doctors = [];

		var initRequest = {
			ClinicId: doctors.ClinicId,
			Take: 10,
			Skip: 1,
			Term: "",
			Sort: "",
			SortType: "desc"
		};
		$scope.hasMoreData = true;
		doctors.loadData = function () {
			if (doctors.Doctors.length == 0) {
				console.log("First Request" + JSON.stringify(initRequest));
				tebmapApi.getDoctors(initRequest).then(function (data) {
					doctors.Doctors = data.Doctors;
					doctors.Take = data.Take;
					doctors.Skip = data.Skip;
					doctors.TotalItems = data.TotalItems;
					if (doctors.Doctors == null||doctors.Doctors.length===0) {
						$scope.hasMoreData = false;

					} else if (doctors.Doctors != null && doctors.Doctors.length>0) {
						// console.log(doctors.Doctors.length);
						// console.log("True");
						$scope.hasMoreData = true;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
					doctors.Skip = doctors.Skip + 1;
				});
			} else if (doctors.Doctors.length > 0) {
				var doctorsRequest = {
					ClinicId: doctors.ClinicId,
					Take: initRequest.Take,
					Skip: doctors.Skip,
					Term: "",
					Sort: "",
					SortType: "desc"
				};
				console.log("Other Request" + JSON.stringify(doctorsRequest));
				if (((doctorsRequest.Skip * doctorsRequest.Take) <= doctors.TotalItems)) {
					tebmapApi.getDoctors(doctorsRequest).then(function (data) {
						doctors.Doctors = doctors.Doctors.concat(data.Doctors);
						doctors.Take = data.Take;
						doctors.Skip = data.Skip;
						doctors.TotalItems = data.TotalItems;
						$scope.$broadcast('scroll.infiniteScrollComplete');
						doctors.Skip = doctors.Skip + 1;
					});
				} else if (((doctorsRequest.Skip * doctorsRequest.Take) >= doctors.TotalItems)) {
					$scope.hasMoreData = false;
				}
			}
		};

		doctors.doRefresh = function () {
			console.log("Refresh Request : " + JSON.stringify(initRequest));
			tebmapApi.getDoctors(initRequest).then(function (data) {
				doctors.Doctors = data.Doctors;
				doctors.Take = data.Take;
				doctors.Skip = data.Skip;
				doctors.TotalItems = data.TotalItems;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
	}
})();
