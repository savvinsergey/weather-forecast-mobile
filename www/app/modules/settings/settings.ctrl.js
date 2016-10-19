(function(){
  'use strict';

  angular.module('weatherApp.modules.settings')
    .controller('SettingsCtrl',[
      '$scope',
      'SettingsSvc',
       SettingsCtrl
    ]);

    function SettingsCtrl($scope , SettingsSvc) {
      this.settings= SettingsSvc;
    };

}());


