/// <reference path="../typings/tsd.d.ts" />

interface IStSearch extends ng.IScope {
  searchQuery: string;
  searchActive: boolean;
  searchResults: Array<StTrack>;

  addTrackToQueue(track: StTrack);
  playTrack(track: StTrack);
}

function stSearchController($scope: IStSearch, SpotifyPlayer: SpotifyPlayer, QueueService: QueueService, SpotifyWeb: SpotifyWeb, lodash: lodash) {

  $scope.$watch('searchQuery', lodash.debounce(onSeach, 450, {'trailing': true}));
  $scope.addTrackToQueue = addTrackToQueue;
  $scope.playTrack = playTrack;
  $scope.searchActive = false;

  function addTrackToQueue(track: StTrack) {
    QueueService.append(track);
  }

  function playTrack(track: StTrack) {
    QueueService.prepend(track);
    SpotifyPlayer.play(track);
  }


  function onSeach(query: string) {
    if (query && query.length > 2) {
      $scope.searchActive = true;
      SpotifyWeb.searchTrack(query)
          .then(function(v: Array<StTrack>) {
            console.log(v);
            if (v && v.length > 0) {
              $scope.searchResults = v;
              console.log($scope.searchResults);
            }
        });
    }
  }

}

starTrack.controller('stSearchController', stSearchController);
