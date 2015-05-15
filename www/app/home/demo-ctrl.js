(function () {
	'use strict';
	angular.module('tebmap').controller('DemoCtrl', ['$cordovaDialogs', DemoCtrl]);
	function DemoCtrl($cordovaDialogs) {
		var data = this;
		data.alert = function () {
            $cordovaDialogs.alert('Wow!', alertClosed, "Alert Title", "Dismiss");
        };

        function alertClosed() {
            $cordovaDialogs.alert("Alert was closed.");
        }

        data.confirm = function () {
            $cordovaDialogs.confirm('Are you sure?', confirmClosed, "Confirmation", ["Yes", "No"]);
        };

        function confirmClosed(buttonIndex) {
            $cordovaDialogs.alert("Button selected: " + buttonIndex);
        }

        data.prompt = function () {
            $cordovaDialogs.prompt('Please Login', promptClosed, "Login", ["Login", "Cancel"]);
        };

        function promptClosed(results) {
            alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
        }

        data.beep = function () {
            // beep 3 times
            $cordovaDialogs.beep(3);
        };
	}

})();