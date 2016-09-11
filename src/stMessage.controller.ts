/// <reference path="../typings/tsd.d.ts" />

interface IStMessageController extends ng.IScope {
  messageInput: string;
  textInput: boolean;

  sendMessage();
}

function stMessageController($scope: IStMessageController, ChatService: ChatService) {

  $scope.$watch('messageInput', onInput);
  $scope.textInput = false;
  $scope.messageInput = '';
  $scope.sendMessage = sendMessage;

  function sendMessage() {
    let message: any = {};
    message.content = $scope.messageInput;
    message.createdAt = new Date();
    message.roomId = 'od23uuKv7pAR1VjD';
    let newMessage = new StMessage(message);
    ChatService.add(newMessage);
    $scope.messageInput = '';
  }

  function onInput(input: string) {
    if (input && input.length > 0) {
      $scope.textInput = true;
      $scope.messageInput = input;
    } else {
       $scope.textInput = false;
    }
  }

}

starTrack.controller('stMessageController', stMessageController);
