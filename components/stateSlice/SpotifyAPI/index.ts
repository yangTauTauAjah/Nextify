import { BearerToken, PlaylistObject } from "./interfaces";

const BASE_PATH = "https://api.spotify.com/v1";

const client_id = "b6f05292d14148a08f5e70d8fe2ba898";
const client_secret = "db8e39458543405e8d2d790559677d66";

async function getAccessToken(): Promise<BearerToken> {
  const data: BearerToken = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    }
  ).then((data) => data.json());
  return data;
}

export async function getPlaylist(id: string): Promise<PlaylistObject> {
  const { access_token } = await getAccessToken();
  const data: PlaylistObject = await fetch(`${BASE_PATH}/playlists/${id}`, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).then((data) => data.json());
  return data;
}

/* async function refreshToken(refresh_token: string): Promise<string> {
  return
} */
