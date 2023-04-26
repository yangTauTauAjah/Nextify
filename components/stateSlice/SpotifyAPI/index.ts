import { GET_PLAYLIST } from "./fields";
import { BearerToken, PlaylistObject, UserObject } from "./interfaces";

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
  return { ...data, owner, tracks: data.tracks.items };
}

export async function getUser(
  id: string,
  fields?: string
): Promise<UserObject> {
  const { access_token } = await getAccessToken();
  let path = `${BASE_PATH}/users/${id}`;
  if (fields && fields !== "") path += `?fields=${fields}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  return data;
}

/* async function refreshToken(refresh_token: string): Promise<string> {
  return
} */
