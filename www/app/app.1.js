angular.module('alodoctorApp', ['ionic.service.core','ngCordova', 'ionic'])

  .run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(['$ionicAppProvider',function ($stateProvider, $urlRouterProvider,$ionicAppProvider) {

  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '42d89a36',
    // The public API key all services will use for this app
    api_key: '415b50ca0dba0c4afd32deb8703340d48aae9c019587215a',
    // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
    // gcm_id: 'YOUR_GCM_ID'
  });
  $stateProvider
    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "app/templates/menu.html"
  })
    .state('app.notes', {
    url: "/notes/:clinicId",
    views: {
      'menuContent': {
        templateUrl: "app/templates/notes.html"
      }
    }
  })
    .state('app.note', {
    url: "/note/:Id",
    views: {
      'menuContent': {
        templateUrl: "app/templates/note.html"
      }
    }
  })
    .state('app.demo', {
    url: "/demo",
    views: {
      'menuContent': {
        templateUrl: "app/templates/demo.html"
      }
    }
  });
  $urlRouterProvider.otherwise('/app/demo');
}])
