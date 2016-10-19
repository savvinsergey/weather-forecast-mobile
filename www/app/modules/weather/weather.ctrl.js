(function(){
  'use strict';

  angular.module('weatherApp.modules.weather')
    .controller('WeatherCtrl',
      [ '$scope',
        'SettingsSvc',
        'WeatherSvc',
        'LocationSvc',
        '$ionicLoading',
        '$ionicPlatform',
        '$cordovaGeolocation',
         WeatherCtrl
      ]);

    function WeatherCtrl($scope, SettingsSvc, WeatherSvc, LocationSvc, $ionicLoading, $ionicPlatform, $cordovaGeolocation){
      var self = this;

      function getWeather(){

        self.haveData = false;
        $ionicLoading.show({
          template: 'Loading...'
        });

        WeatherSvc.getWeatherAtLocation(LocationSvc.lat,LocationSvc.long)
          .then(function (resp){

            self.current = resp.data.currently;
            self.temperature = {
              low     : Math.floor(resp.data.daily.data[0].temperatureMin),
              high    : Math.ceil(resp.data.daily.data[0].temperatureMax),
              current : Math.ceil(self.current.temperature)
            };

            self.haveData = true;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');

          },function(error){
            console.error(error);
          });
      };

      function initialize(){
        if (LocationSvc.lat === 0) {
          $cordovaGeolocation
            .getCurrentPosition({
              timeout: 10000,
              enableHighAccurancy: false,
              maximumAge: 0
            })
            .then(function(position){
              LocationSvc.lat  = position.coords.latitude;
              LocationSvc.long = position.coords.longitude;

              getWeather();
            },function(error){
              alert(JSON.stringify(error));
              console.log(error);
            })
        }
      };

      //----------------------------------------------//

      $ionicPlatform.ready(function(){
        initialize();
      });

      this.doRefresh = function(){
        getWeather();
      };

      $scope.$watch(function(){
        return SettingsSvc.units;
      },function(newVal,oldVal){
        if(!!newVal && newVal !== oldVal){
          getWeather();
        }
      });

    };

}());
