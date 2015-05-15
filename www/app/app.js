angular.module('tebmap', ['ngCordova','ionic'])

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
  .config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('intro', {
    url: '/',
    templateUrl: 'app/intro/intro.html'
  })
    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "app/layout/menu.html"
  })
    .state('home', {
    url: "/home",
    templateUrl: "app/home/home.html"
  })
    .state('app.notes', {
    url: "/notes/:clinicId",
    views: {
      'menuContent': {
        templateUrl: "app/notes/notes.html"
      }
    }
  })
    .state('app.questions', {
    url: "/questions/:clinicId",
    views: {
      'menuContent': {
        templateUrl: "app/questions/questions.html"
      }
    }
  })
    .state('app.doctors', {
    url: "/doctors/:clinicId",
    views: {
      'menuContent': {
        templateUrl: "app/doctors/doctors.html"
      }
    }
  })
    .state('app.popularnotes', {
    url: "/popularnotes/:clinicId",
    views: {
      'menuContent': {
        templateUrl: "app/notes/popularnotes.html"
      }
    }
  })
    .state('app.note', {
    url: "/note/:Id",
    views: {
      'menuContent': {
        templateUrl: "app/notes/note.html"
      }
    }
  })

    .state('app.doctor', {
    url: "/doctor/:Id",
    views: {
      'menuContent': {
        templateUrl: "app/doctors/doctor.html"
      }
    }
  })
    .state('app.question', {
    url: "/question/:Id",
    views: {
      'menuContent': {
        templateUrl: "app/questions/question.html"
      }
    }
  })
    .state('app.demo', {
    url: "/demo",
    views: {
      'menuContent': {
        templateUrl: "app/home/demo.html"
      }
    }
  });
  $urlRouterProvider.otherwise('/');
})
