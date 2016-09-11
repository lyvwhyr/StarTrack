/// <reference path="../typings/tsd.d.ts" />

interface IStPlayer extends ng.IScope {
 currentTrack: StTrack;

  login();
  play(index?: number);
  pause();
  stop();
  nextTrack();
  previousTrack();

}

function stPlayerController($scope: IStPlayer, SpotifyPlayer: SpotifyPlayer, QueueService: QueueService, SpotifyWeb: SpotifyWeb) {

  $scope.play = play;
  $scope.pause = pause;
  $scope.stop = pause;
  $scope.login = login;
  $scope.nextTrack = nextTrack;
  $scope.previousTrack = previousTrack;


  function setSong(track: StTrack) {
    console.log('stPlayerController: setSong() called');
    console.log('stPlayerController: track updated to ' + track.title);
    $scope.currentTrack = track;
  }

  $scope.$on('SpotifyPlayer:play', function(event: ng.IAngularEvent, track: StTrack) {
     $scope.currentTrack = track;
   });

  function play(index?: number) {
    let song: StTrack;
    if (index) {
      song = QueueService.get(index);
    } else {
      song = QueueService.get();
    }
    SpotifyPlayer.play(song);
  }

  function pause() {
    SpotifyPlayer.pause();
  }

  function login() {
    SpotifyWeb.login();
  }

  function nextTrack() {
    QueueService.index++;
    let song: StTrack = QueueService.get();
    setSong(song);
  }

  function previousTrack() {
    QueueService.index--;
    let song: StTrack = QueueService.get();
    setSong(song);
  }


}

starTrack.controller('stPlayerController', stPlayerController);
