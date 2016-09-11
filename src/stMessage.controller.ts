/// <reference path="../typings/tsd.d.ts" />

interface IStMessageController extends ng.IScope {
  messageInput: string;
  textInput: boolean;
  messages: Array<StMessage>;

  sendMessage();
}

function stMessageController($scope: IStMessageController) {

  $scope.$watch('messageInput', onInput);
  $scope.textInput = false;
  $scope.messageInput = '';
  $scope.sendMessage = sendMessage;
  $scope.messages = [];

  function sendMessage() {
    let message: IStMessage;
    message.content = $scope.messageInput;
    message.createdAt = new Date();
    message.roomId = 'od23uuKv7pAR1VjD';
    let newMessage = new StMessage(message);
    $scope.messages.push(newMessage);
    $scope.messageInput = '';
  }

  function onInput(input: string) {
    if (input && input.length > 0) {
      $scope.textInput = true;
    } else {
       $scope.textInput = false;
    }
  }

}

starTrack.controller('stMessageController', stMessageController);
