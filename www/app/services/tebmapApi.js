(function () {
	'use strict';
	angular.module('tebmap').factory('tebmapApi', ['$http', '$q', '$ionicLoading', '$timeout', tebmapApi]);
	function tebmapApi($http, $q, $ionicLoading, $timeout) {

		var now = new Date();
		var requestDatetime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

		var apprequest = JSON.parse('{"ApiKey":"","DeviceId":"","RequestDateTime":""}');
		apprequest.ApiKey = "WIG3BmFbjWBmwDZPE5E7b2bP6L6mGTsXArdiOegc4eU=";
		apprequest.DeviceId = "9774d56d682e549c";
		apprequest.RequestDateTime = requestDatetime;

		function getNotes(requestData) {
			var deferred = $q.defer();
			var request = JSON.parse('{"apprequest":{"ApiKey":"","DeviceId":"", "RequestDateTime":""},"ClinicId":"","Take":"","Skip":"","Term":"‌","Sort":"‌","SortType":""}');
			request.apprequest = apprequest;
			request.ClinicId = requestData.ClinicId;
			request.Take = requestData.Take;
			request.Skip = requestData.Skip;
			request.Term = requestData.Term;
			request.Sort = requestData.Sort;
			request.SortType = requestData.SortType;
			$ionicLoading.show({ template: '... در حال بارگذاری اطلاعات' });
			$http({
				url: 'http://api.alodoctor.ir/note/getnotes',
				method: "POST",
				data: JSON.stringify(request),
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}).success(function (data) {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.resolve(data);
				}, 3000);
			}).error(function () {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.reject();
				});

			});

			return deferred.promise;
		};

		function getNote(Id) {
			var deferred = $q.defer();
			var request = JSON.parse('{"apprequest":{"ApiKey":"","DeviceId":"", "RequestDateTime":""},"Id":""}');
			request.apprequest = apprequest;
			request.Id = Id;
			$ionicLoading.show({ template: '... در حال بارگذاری اطلاعات' });
			$http({
				url: 'http://api.alodoctor.ir/note/getnote',
				method: 'POST',
				data: JSON.stringify(request),
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}).success(function (data) {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.resolve(data);
				}, 3000);
			}).error(function () {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.reject();
				});
			});
			return deferred.promise;
		}

		function getPopularNotes(requestData) {
			var deferred = $q.defer();
			var request = JSON.parse('{"apprequest":{"ApiKey":"","DeviceId":"", "RequestDateTime":""},"ClinicId":"","Take":"","Skip":"","Term":"‌","Sort":"‌","SortType":""}');
			request.apprequest = apprequest;
			request.ClinicId = requestData.ClinicId;
			request.Take = requestData.Take;
			request.Skip = requestData.Skip;
			request.Term = requestData.Term;
			request.Sort = requestData.Sort;
			request.SortType = requestData.SortType;
			/*console.log("Request : " + JSON.stringify(request));*/
			$ionicLoading.show({ template: '... در حال بارگذاری اطلاعات' });
			$http({
				url: 'http://api.alodoctor.ir/note/getnotes',
				method: "POST",
				data: JSON.stringify(request),
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}).success(function (data) {
				$timeout(function () {
					$ionicLoading.hide();
					/*console.log("Output : " +JSON.stringify(data));*/
					deferred.resolve(data);
				}, 3000);
			}).error(function () {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.reject();
				});

			});

			return deferred.promise;
		};

		function getQuestions(requestData) {
			var deferred = $q.defer();
			var request = JSON.parse('{"apprequest":{"ApiKey":"","DeviceId":"", "RequestDateTime":""},"ClinicId":"","Take":"","Skip":"","Term":"‌","Sort":"‌","SortType":""}');
			request.apprequest = apprequest;
			request.ClinicId = requestData.ClinicId;
			request.Take = requestData.Take;
			request.Skip = requestData.Skip;
			request.Term = requestData.Term;
			request.Sort = requestData.Sort;
			request.SortType = requestData.SortType;
			$ionicLoading.show({ template: '... در حال بارگذاری اطلاعات' });
			$http({
				url: 'http://api.alodoctor.ir/question/getquestions',
				method: "POST",
				data: JSON.stringify(request),
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}).success(function (data) {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.resolve(data);
				}, 1000);
			}).error(function () {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.reject();
				});
			});
			return deferred.promise;
		};

		function getQuestion(Id) {
			var deferred = $q.defer();
			var request = JSON.parse('{"apprequest":{"ApiKey":"","DeviceId":"", "RequestDateTime":""},"Id":""}');
			request.apprequest = apprequest;
			request.Id = Id;
			$ionicLoading.show({ template: '... در حال بارگذاری اطلاعات' });
			$http({
				url: 'http://api.alodoctor.ir/question/getquestion',
				method: 'POST',
				data: JSON.stringify(request),
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}).success(function (data) {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.resolve(data);
				}, 3000);
			}).error(function () {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.reject();
				});
			});
			return deferred.promise;
		}

		function getDoctors(requestData) {
			var deferred = $q.defer();
			var request = JSON.parse('{"apprequest":{"ApiKey":"","DeviceId":"", "RequestDateTime":""},"ClinicId":"","Take":"","Skip":"","Term":"‌","Sort":"‌","SortType":""}');
			request.apprequest = apprequest;
			request.ClinicId = requestData.ClinicId;
			request.Take = requestData.Take;
			request.Skip = requestData.Skip;
			request.Term = requestData.Term;
			request.Sort = requestData.Sort;
			request.SortType = requestData.SortType;
			$ionicLoading.show({ template: '... در حال بارگذاری اطلاعات' });
			$http({
				url: 'http://api.alodoctor.ir/doctor/getdoctors',
				method: "POST",
				data: JSON.stringify(request),
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}).success(function (data) {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.resolve(data);
				}, 1000);
			}).error(function () {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.reject();
				});
			});
			return deferred.promise;
		};

		function getDoctor(Id) {
			var deferred = $q.defer();
			var request = JSON.parse('{"apprequest":{"ApiKey":"","DeviceId":"", "RequestDateTime":""},"Id":""}');
			request.apprequest = apprequest;
			request.Id = Id;
			$ionicLoading.show({ template: '... در حال بارگذاری اطلاعات' });
			$http({
				url: 'http://api.alodoctor.ir/doctor/getdoctor',
				method: "POST",
				data: JSON.stringify(request),
				headers: { 'Content-Type': 'application/json;charset=utf-8' }
			}).success(function (data) {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.resolve(data);
				}, 1000);
			}).error(function () {
				$timeout(function () {
					$ionicLoading.hide();
					deferred.reject();
				});
			});
			return deferred.promise;
		};

		return {
			getNotes: getNotes,
			getNote: getNote,
			getPopularNotes: getPopularNotes,
			getQuestions: getQuestions,
			getQuestion: getQuestion,
			getDoctors: getDoctors,
			getDoctor: getDoctor,
		};
	};
})();
