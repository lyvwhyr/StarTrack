
class SpotifyPlayer {
  public currentTrack: StTrack;

  private rootScope: any;
  private spotify: any;
  private enabled: boolean;
  private mp3Player: any;

  private tag: string;
  // dependencies would be injected here
  constructor($window: ng.IWindowService, $rootScope: ng.IRootScopeService) {
    this.rootScope = $rootScope;
    this.mp3Player = $window.audioPlayer;
    this.tag = 'SpotifyPlayer: ';
    this.enabled = true;
    try {
      this.spotify = $window.plugins.spotify;
    } catch (e) {
      this.log('SpotifyPlayer: constructor: Service unavailble');
      this.log(e);
      this.enabled = false;
    }
  }

  login() {
    this.log('SpotifyPlayer: login() called');
    if (this.enabled === false) {
      return;
    }
    this.spotify.login();
  }

  play(track: StTrack) {
    this.log('SpotifyPlayer: play() called');
    this.currentTrack = track;
    this.rootScope.$broadcast('SpotifyPlayer:play', this.currentTrack);
    if (this.enabled === false) {
      this.log('SpotifyPlayer: service unavailble, playing preview track');
      this.mp3Player.src = this.currentTrack.previewTrack;
      this.mp3Player.play();
      return;
    }
    this.spotify.play(this.currentTrack.uri);
    this.log('SpotifyPlayer: playing track ' + this.currentTrack.uri);
  }

  pause() {
    this.log('SpotifyPlayer: pause() called');
    if (this.enabled === false && this.currentTrack.uri) {
      this.log('SpotifyPlayer: service unavailble, pausing preview track');
      this.mp3Player.pause();
      return;
    }
    this.spotify.pause();
    this.log('SpotifyPlayer: paused track ' + this.currentTrack.uri);
  }

  resume() {
    this.log('SpotifyPlayer: resume() called');
    if (this.enabled === false && this.currentTrack.uri) {
      this.log('SpotifyPlayer: service unavailble, pausing preview track');
      this.mp3Player.play();
      return;
    }
    this.spotify.resume();
    this.log('SpotifyPlayer: resumed track ' + this.currentTrack.uri);
  }

  log(logEntry: string) {
    console.log(this.tag + logEntry);
  }
  
}

starTrack.service('SpotifyPlayer', SpotifyPlayer);
