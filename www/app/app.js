(function(){
  'use strict';

  angular.module('weatherApp', [
      'weatherApp.config',
      'weatherApp.modules.weather',
      'weatherApp.modules.settings',
      'ionic',
      'ngCordova'
    ])
    .config(['$stateProvider','$urlRouterProvider',config])
    .run(['$ionicPlatform',run]);

    function config($stateProvider,$urlRouterProvider){

      $stateProvider
        .state('app',{
          url: '/app',
          abstract: true,
          templateUrl: 'app/modules/settings/settings.tpl.html',
          controller: 'SettingsCtrl',
          controllerAs: 'SettingsVm'
        })
        .state('app.weather',{
          url: '/weather',
          views: {
            'menu-content' : {
              templateUrl: 'app/modules/weather/weather.tpl.html',
              controller: 'WeatherCtrl',
              controllerAs: 'WeatherVm'
            }
          }
        });

      $urlRouterProvider.otherwise('/app/weather')

    }

    function run($ionicPlatform) {

      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });

    }

}());

