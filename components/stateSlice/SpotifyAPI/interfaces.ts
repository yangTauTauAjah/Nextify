export type CollectionType = 'album' | 'playlist' | 'track'

export interface ImageObject {
  url: string;
  width: number;
  height: number;
}

export interface AlbumObject {
  id: string;
  name: string;
  album_type: "album" | "single" | "compilation";
  type: 'album';
  images: ImageObject[];
  total_tracks: number;
  release_date: string;
  artists: ArtistObject[];
  tracks: {
    items: TrackObject[]
  }
}

export interface UserObject {
  id: string;
  display_name: string;
  images: ImageObject[] | [];
  followers: unknown;
}

export interface ArtistObject {
  type: 'artist';
  id: string;
  name: string;
  images: ImageObject[];
}

export interface TrackObject {
  id: string;
  name: string;
  artists: ArtistObject[];
  album: AlbumObject;
  explicit: boolean;
  duration: number;
}

export interface PlaylistItems {
  added_at: Date;
  track: TrackObject;
}

export interface PlaylistObject {
  type: 'playlist',
  name: string;
  description: string;
  images: ImageObject[];
  owner: UserObject;
  tracks: {
    items: PlaylistItems[]
  };
}

export interface BearerToken {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
}