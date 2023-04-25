

interface ImageObject {
  url: string;
  width: number;
  height: number;
}

interface AlbumObject {
  id: string;
  name: string;
  images: ImageObject;
}

interface PlaylistOwner {
  id: string;
  name: string;
}

interface ArtistObject {
  id: string;
  name: string;
}

interface TrackObject {
  id: string;
  name: string;
  artist: ArtistObject[];
  album: AlbumObject;
  explicit: boolean;
  duration: number;
}

interface PlaylistItems {
  added_at: Date;
  track: TrackObject;
}

export interface PlaylistObject {
  name: string;
  description: string;
  image: string;
  owner: PlaylistOwner;
  tracks: PlaylistItems[];
}

export interface BearerToken {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
}