/// <reference path="../typings/tsd.d.ts" />

const appName: string = 'starTrack';

const firebaseConfig: Object = {
  apiKey: 'AIzaSyAx2Ue674tIIQiDTfzQ95uIRHZqn142xUk',
  authDomain: 'startrack-6bdbb.firebaseapp.com',
  databaseURL: 'https://startrack-6bdbb.firebaseio.com',
  storageBucket: 'startrack-6bdbb.appspot.com'
};

function runBlock($log: ng.ILogService) {
  $log.debug('runBlock end');
}

var starTrack =  angular
  .module(appName, ['ngMaterial', 'spotify', 'LocalStorageModule', 'ngLodash'])
  .constant('_', _)
  .constant('moment', moment)
  .constant('firebase', firebase)
  .run(runBlock);;



// initialize Firebase
/*
var config = {

};
firebase.initializeApp(config);
*/

angular.element(document).ready(function () {
    if (window.cordova) {
      console.log('Running in Cordova, will bootstrap AngularJS once \'deviceready\' event fires.');
      document.addEventListener('deviceready', function () {
        console.log('Deviceready eve<script src="https://www.gstatic.com/firebasejs/3.3.2/firebase.js"></script>nt has fired, bootstrapping AngularJS.');   
      }, false);
    } else {
      console.log('Running in browser, bootstrapping AngularJS now.');
    }
    firebase.initializeApp(firebaseConfig);
    window.audioPlayer = document.createElement('audio');
    angular.bootstrap(document.body, [appName]);
  });

