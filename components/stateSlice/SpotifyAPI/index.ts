import { GET_PLAYLIST } from "./fields";
import {
  AlbumObject,
  ArtistObject,
  BearerToken,
  PlaylistObject,
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
  let path = `${BASE_PATH}/artists?ids=${ids.join(',')}`;
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

  /* const artists: ArtistObject[] = []

  for (let i = 0; i < data.artists.length; i++) {
    artists.push(await getArtist(data.artists[i].id))
  } */
  const artists = await getArtist(data.artists.map(e => e.id))
  
  return { ...data, artists };
}

/* async function refreshToken(refresh_token: string): Promise<string> {
  return
} */
