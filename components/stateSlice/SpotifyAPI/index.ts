import { GET_PLAYLIST } from "./fields";
import {
  AlbumObject,
  ArtistObject,
  BearerToken,
  PlaylistObject,
  TrackObject,
  UserObject
} from "./interfaces";

const BASE_PATH = "https://api.spotify.com/v1";

async function getAccessToken(): Promise<BearerToken> {
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

export async function getUser(id: string): Promise<UserObject> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/users/${id}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  return data;
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

/* async function refreshToken(refresh_token: string): Promise<string> {
  return
} */
