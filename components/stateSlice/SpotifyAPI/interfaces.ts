

export interface ImageObject {
  url: string;
  width: number;
  height: number;
}

interface AlbumObject {
  id: string;
  name: string;
  images: ImageObject[];
}

export interface UserObject {
  id: string;
  display_name: string;
  images: ImageObject[] | [];
  followers: unknown;
}

export interface ArtistObject {
  id: string;
  name: string;
}

export interface TrackObject {
  id: string;
  name: string;
  artists: ArtistObject[];
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
  images: ImageObject[];
  owner: UserObject;
  tracks: PlaylistItems[];
}

export interface BearerToken {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
}