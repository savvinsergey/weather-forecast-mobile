(function(){
  'use strict';

  angular.module('weatherApp.modules.settings')
    .factory('SettingsSvc',SettingsSvc);

    function SettingsSvc() {
      var Settings = {
        units: 'us'
      };
      return Settings;
    };

}());
