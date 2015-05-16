(function () {
	'use strict';
	angular.module('tebmap').controller('DoctorCtrl', ['$stateParams', 'tebmapApi', DoctorCtrl]);
	function DoctorCtrl($stateParams, tebmapApi) {
		var doctor = this;
		doctor.Id = Number($stateParams.Id);
		tebmapApi.getDoctor(doctor.Id).then(function (data) {
			doctor.Avatar = data.Avatar;
			doctor.FullName = data.FullName;
			doctor.Email = data.Email;
			doctor.SpecialityName = data.SpecialityName
			doctor.Clinics = data.Clinics;
			doctor.RelatedDiseases = data.RelatedDiseases;
			doctor.RelatedQuestions = data.RelatedQuestions;
		});
	}
})();
