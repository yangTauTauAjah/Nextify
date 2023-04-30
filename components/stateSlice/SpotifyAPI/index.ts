// import { GET_PLAYLIST } from "./fields";
import {
  AccessToken,
  AlbumObject,
  ArtistObject,
  BearerToken,
  PlaylistObject,
  RefreshToken,
  TrackObject,
  UserObject
} from "./interfaces";

const BASE_PATH = "https://api.spotify.com/v1";
export const REDIRECT_URI = "http://localhost:3000/callback";

async function getAccessToken(): Promise<BearerToken>;
async function getAccessToken(code: string): Promise<RefreshToken>;

async function getAccessToken(
  code?: string
): Promise<BearerToken | RefreshToken> {
  if (code && code !== "") {
    const data: RefreshToken = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "post",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `code=${code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}`
      }
    ).then((data) => data.json());
    return data;
  } else {
    const data: BearerToken = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
      }
    ).then((data) => data.json());
    return data;
  }
}

async function refreshToken(refresh_token: string): Promise<AccessToken> {
  const data: AccessToken = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString('base64'),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}&client_secret=${process.env.CLIENT_SECRET}`
    }
  ).then((data) => data.json());

  return data;
}

export async function getUser(id: string): Promise<UserObject> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/users/${id}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  return data;
}

export async function getCurrentUserProfile(code: string): Promise<UserObject> {
  const { access_token } = await refreshToken(code);
  let path = `${BASE_PATH}/me`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  return data;
}

export async function getCurrentUserSavedAlbum(code: string): Promise<AlbumObject[]> {
  const { access_token } = await refreshToken(code);
  let path = `${BASE_PATH}/me/albums`;
  const data: { items: { album: AlbumObject }[] } = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());

  return data.items.map((e) => e.album);
}

export async function getCurrentUserFollowedArtist(
  code: string
): Promise<ArtistObject[]> {
  const { access_token } = await refreshToken(code);
  let path = `${BASE_PATH}/me/following?type=artist`;
  const data: { artists: { items: ArtistObject[] } } = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  
  return data.artists.items;
}

export async function getCurrentUserPlaylist(code: string): Promise<PlaylistObject[]> {
  const { access_token } = await refreshToken(code);
  let path = `${BASE_PATH}/me/playlists`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());

  return data.items;
}

export async function getArtist(ids: string[]): Promise<ArtistObject[]> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/artists?ids=${ids.join(",")}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  return data.artists;
}

export async function getArtistAlbum(
  id: string,
  market?: string,
  include_groups?: string[],
  limit?: number,
  offset?: number
): Promise<AlbumObject[]> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/artists/${id}/albums?`;
  if (market) path += `market=${market}`;
  if (include_groups && include_groups.length > 0)
    path += `include_groups=${include_groups.join(",")}`;
  if (limit) path += `limit=${limit}`;
  if (offset) path += `offset=${offset}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  return data.items;
}

export async function getArtistTopTrack(
  id: string,
  market: string
): Promise<TrackObject[]> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/artists/${id}/top-tracks?market=${market}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());

  return data.tracks;
}

export async function getRelatedArtist(id: string): Promise<ArtistObject[]> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/artists/${id}/related-artists`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());

  return data.artists;
}

export async function getPlaylist(
  id: string,
  fields?: string
): Promise<PlaylistObject> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/playlists/${id}`;
  if (fields && fields !== "") path += `?fields=${fields}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  const owner = await getUser(data.owner.id);
  return { ...data, owner };
}

export async function getAlbum(id: string): Promise<AlbumObject> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/albums/${id}`;
  const data: AlbumObject = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());

  const artists = await getArtist(data.artists.map((e) => e.id));

  return { ...data, artists };
}

export async function getTrack(id: string): Promise<TrackObject> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/tracks/${id}`;
  const data: TrackObject = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());

  const artists = await getArtist(data.artists.map((e) => e.id));

  return { ...data, artists };
}
