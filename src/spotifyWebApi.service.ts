
class SpotifyWeb {
  private spotify: any;
  private token: string;
  private searchLimit: number;
  private searchPage: number;
  private searchTypes: Array<string>;
  private _: any;
  private tag: string;
  private log: any;
  // dependencies would be injected here
  constructor($log: ng.ILogService, Spotify: Spotify, localStorageService: localStorageService, lodash: lodash) {
    this.tag = 'SpotifyWeb: ';
    this.log = $log.debug;
    this._ = lodash;
    this.spotify = Spotify;
    this.searchLimit = 20;
    this.searchPage = 0;
    // this.searchTypes = ['album', 'artist', 'playlist', 'track'];
    this.searchTypes = ['track'];
    this.token = localStorageService.get('spotify-token');
    if (this.token) {
      this.log('SpotifyWeb: constructor: service started');
    } else {
      this.log('SpotifyWeb: constructor: token unavailble');
    }
  }

  searchTrack(query: string) {
    return this.spotify
        .search(query, this.searchTypes.join(','))
        .then(function (data: any) {
          console.log('SpotifyWeb: search: data from search query');
          let results: Array<StTrack> = [];
          this._.each(data.tracks.items, function(v: any) {
            // this.log(v);
            results.push(new StTrack(v));
          });
          // this.log(data.tracks.items);
          return results;
        })
        .catch(function (e: Error) {
          console.log('SpotifyWeb: search: error occured while querying');
          console.log(e);
        });
  }

  login() {
    return this.spotify.login();
  }

  getTrackByUri(uri: string) {
    return this.spotify
        .getTrack(uri)
        .then(function (data: any) {
          console.log('SpotifyWeb: getTrackByUri: data from query');
          console.log(data);
        })
        .catch(function (e: Error) {
          console.log('SpotifyWeb: getTrackByUri: error occured while querying');
          console.log(e);
        });
  }

}


starTrack.service('SpotifyWeb', SpotifyWeb);
