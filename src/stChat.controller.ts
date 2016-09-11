/// <reference path="../typings/tsd.d.ts" />

interface IStChatController extends ng.IScope {
  messages: Array<StMessage>;
}

function stChatController($scope: IStChatController, ChatService: ChatService) {

  $scope.messages =  [];

  $scope.$on('ChatService:add', function(event: ng.IAngularEvent, message: StMessage) {
     $scope.messages.unshift(message);
   });

}

starTrack.controller('stChatController', stChatController);
