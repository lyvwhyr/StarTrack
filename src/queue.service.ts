class QueueService {
  queue: Array<StTrack>;
  index: number;
  log: any;
  repeat: boolean;
  shuffle: boolean;

  // dependencies would be injected here
  constructor($log: any) {
    this.index = 0;
    this.log = $log.debug;
    this.queue = [];
  }

  /*
    append
      adds/append song to end of playlist/queue
    @song{StTrack} - StTrack instace to be added
  */
  append(song: StTrack) {
    this.queue.push(song);
  }

  /*
    prepend
      adds/prepends song to beginging of playlist/queue
    @song{StTrack} - StTrack instace to be added
  */
  prepend(song: StTrack) {
    this.index++;
    this.queue.unshift(song);
  }

  /*
    remove
      Removes a song from playlist queue given an index
    @index{number} - index of song to be removed from queue
  */
  remove(index: number) {
    if (index < this.index) {
      this.index--;
    }
    this.queue.splice(index, 1);
  }

  /*
    get
      Retrieves the song in queue for playback
    @index{number} - index of song to be played from queue
    @return{StTrack} - song retrevied in queue
  */
  get(index?: number): StTrack {
    let song: StTrack;
    if (!this.queue.length) {
      this.log('QueueService: get() classed playist empty');
      return;
    }
    if (index) {
      this.index = index;
    }
    try {
      song = this.queue[this.index];
    } catch (e) {
      this.log('QueueService: failed to retrieve track index' + this.index);
      this.log(e);
    }
    return song;
  }

}

starTrack.service('QueueService', QueueService);
