export type CollectionType = 'album' | 'playlist' | 'track'

export interface ImageObject {
  url: string;
  width: number;
  height: number;
}

export interface ComponentTypeInterface {
  type?: CollectionType
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
  type: 'user'
  id: string;
  display_name: string;
  images: ImageObject[] | [];
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
  duration_ms: number;
}

export interface PlaylistItems {
  added_at?: Date;
  track: TrackObject;
}

export interface PlaylistObject {
  type: 'playlist',
  id: string;
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
  token_type: "Bearer";
  expires_in: number;
}

export interface CategoryObject {
  href: string;
  icons: ImageObject[];
  id: string;
  name: string;
}

export interface AccessToken extends BearerToken {
  scope: string,
}

export interface RefreshToken extends AccessToken {
  refresh_token: string;
}

export interface ErrorRequestInterface {
  error: string,
  error_description: string
}