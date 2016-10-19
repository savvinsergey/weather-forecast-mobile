(function(){
  'use strict';

  angular.module('weatherApp.modules.weather')
    .factory('LocationSvc',LocationSvc)
    .factory('WeatherSvc', ['$http', 'SettingsSvc', 'CONFIG',WeatherSvc]);

    function LocationSvc(){
      var Location = {
        lat  : 0,
        long : 0
      };
      return Location;
    }

    function WeatherSvc($http, SettingsSvc, CONFIG){
      var url = 'https://api.darksky.net/forecast/' + CONFIG.FORECASTIO_KEY + '/';

      return {
        getWeatherAtLocation: function(lat,lng){
          return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK&units=' + SettingsSvc.units)
        }
      }

    }

}());
