(function () {
  'use strict';
  angular.module('tebmap').controller('IntroCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate', '$timeout', IntroCtrl]);
  function IntroCtrl($scope, $state, $ionicSlideBoxDelegate, $timeout) {
    var data = this;
    data.slideHasChanged = function (index) {
      if (index >= 4) {
        $timeout(function () {
          $state.go("home");
        }, 1000);
      }
    };
  }
})();