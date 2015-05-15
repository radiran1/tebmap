angular.module('App', ['ionic'])
	.controller('Ctrl', function ($scope, $http, $ionicPopup, $filter) {

	var page = 1;
	$scope.commits = [];
	$scope.more = true;

	$scope.loadGithubCommits = function () {
		// Load the data from the github api. 
		$http.get('https://api.github.com/repos/driftyco/ionic/commits?page=' + page)
			.success(function (commits, status, headers) {
			// Check Link header to determine if more pages are available.
			// If not, disable infinite scroll.
			if (headers('link').search('rel="next"') < 0) {
				$scope.more = false;
			}
			// Push all of the commits from response into model.
			angular.forEach(commits, function (commit) {
				$scope.commits.push(commit);
			});
		})
			.error(function (data, status, headers) {
			// Disable infinite scroll since we've got an error.
			$scope.more = false;
			if (headers('x-ratelimit-remaining') == 0) {
				// Check if it is due to Github rate limiting.
				var popup = $ionicPopup.alert({
					title: 'You have exceeded GitHub\'s Rate Limit.',
					template: 'Try again after ' + $filter('date')(parseInt(headers('x-ratelimit-reset')) * 1000, 'short')
				});
			} else {
				// Otherwise show general alert.
				$ionicPopup.alert({
					title: 'GitHub did not respond.',
					template: 'Please try again.'
				});
			}
		})
			.finally(function () {
			// On finish, increment to next page and alert infiniteScroll to close.
			page++;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
})
	.filter('linkCommit', function () {
	return function (text) {
		// Replace any issue numbers with a link to the issue.
		return text.replace(/\#(\d+)/gmi, "<a href=\"https://github.com\/driftyco\/ionic\/issues\/$1\">\#$1<\/a>")
	};
});

/*		console.log("Init Request : " + JSON.stringify(initRequest));
		alodoctorApi.getPopularNotes(initRequest).then(function (data) {
			popularnotes.Notes = data.Notes;
			popularnotes.Take = data.Take;
			popularnotes.Skip = data.Skip;
			popularnotes.NoteCount =
			popularnotes.TotalItems = data.TotalItems;
			console.log("Init Output : " + JSON.stringify(popularnotes));

		});*/
		
				popularnotes.loadMore = function () {
			console.log("Fuck...");
			if (popularnotes.TotalItems <= 51) {

				initRequest.Skip++;

				console.log("Items Count : " + initRequest.Skip * initRequest.Take);
				console.log("Global Request : " + JSON.stringify(initRequest));
				alodoctorApi.getPopularNotes(initRequest).then(function (data) {
					popularnotes.Notes = popularnotes.Notes.concat(data.Notes);
					popularnotes.Take = data.Take;
					popularnotes.Skip = data.Skip;
					popularnotes.TotalItems = data.TotalItems;
					console.log("Load More : " + JSON.stringify(popularnotes));
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
			}
		};