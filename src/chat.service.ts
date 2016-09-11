class ChatService {
  rootScope: any;
  messages: Array<StMessage>;
  log: any;

  // dependencies would be injected here
  constructor($log: any, $rootScope: ng.IRootScopeService) {
    this.rootScope = $rootScope;
    this.log = $log.debug;
    this.messages = [];
  }

  /*
    add
      adds/append song to end of chat
    @song{StTrack} - StTrack instace to be added
  */
  add(message: StMessage) {
    this.messages.push(message);
    this.rootScope.$broadcast('ChatService:add', message);
  }

}

starTrack.service('ChatService', ChatService);
