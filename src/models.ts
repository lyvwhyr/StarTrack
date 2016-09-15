

class StUser {
  id: string;
  avatar: string;
  userName: string;
  lastName: string;
  firstName: string;
}

interface IStRoomOptions {
  public: boolean;
  password: boolean;
  image: boolean;
  request: boolean;
  radius: number;
}


class StRoom {
  public lat: number;
  public lng: number;
  public name: string;
  public ownerId: string;
  public users: Array<StUser>;
  public queue: Array<StTrack>;
  public messages: Array<StMessage>;
  public options: IStRoomOptions;

  public id: string;

  constructor(room: any) {
    this.id = room.id || undefined;
    this.lat = room.lat || undefined;
    this.lng = room.lng || undefined;
    this.name = room.name || '';
    this.users = room.users || [];
    this.queue = room.queue || [];
    this.messages = room.messages || [];
    this.options = room.options || undefined;
    this.ownerId = room.ownerId || undefined;
  }

}


class StTrack {
  id: string;
  uri: string;
  title: string;
  artist: string;
  explicit: boolean;
  album: string;
  albumCover: string;
  albumCoverSm: string;
  duration: number;
  trackProgress: number;
  previewTrack: string;
  constructor(track: any) {
    this.id = track.id;
    this.uri = track.uri;
    this.title = track.name;
    this.artist = track.artists[0].name;
    this.album = track.album.name;
    this.albumCover = track.album.images[0].url;
    this.albumCoverSm = track.album.images[2].url;
    this.previewTrack = track.preview_url;
    this.duration = track.duration_ms;
    this.trackProgress = 0;
  }
}

enum StMessageType {
    TEXT    = 0,
    IMAGE   = 1,
    VIDEO   = 2,
    REQUEST = 3,
    REJECT  = 4,
    YOUTUBE = 5,
    SPOTIFY = 6,
    LINK    = 7
}

interface IStMessage {
  id?: string;
  content: string;
  type: StMessageType;
  roomId: string;
  createdAt?: Date;
}

class StMessage {
  public id: string;
  public content: string;
  public type: StMessageType;
  private createdAt: Date;
  private roomId: string;

  constructor(message: IStMessage) {
    this.id = message.id || undefined;
    this.content = message.content;
    this.type = message.type;
    this.roomId = message.roomId;
    this.createdAt = message.createdAt || new Date();
  }
}