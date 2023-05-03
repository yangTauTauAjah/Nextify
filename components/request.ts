// import { GET_PLAYLIST } from "./fields";
import {
  AccessToken,
  AlbumObject,
  ArtistObject,
  BearerToken,
  CategoryObject,
  ErrorRequestInterface,
  PlaylistObject,
  RefreshToken,
  TrackObject,
  UserObject
} from "./interfaces";

const BASE_PATH = "https://api.spotify.com/v1";
export const REDIRECT_URI = "http://localhost:3000/callback";

export async function getAccessToken(): Promise<
  BearerToken | ErrorRequestInterface
>;
export async function getAccessToken(
  code: string
): Promise<RefreshToken | ErrorRequestInterface>;

export async function getAccessToken(
  code?: string
): Promise<BearerToken | RefreshToken | ErrorRequestInterface> {
  if (code && code !== "") {
    const data: RefreshToken | ErrorRequestInterface = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "post",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
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

async function refreshToken(
  refresh_token: string
): Promise<AccessToken | ErrorRequestInterface> {
  const data: AccessToken | ErrorRequestInterface = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}&client_secret=${process.env.CLIENT_SECRET}`
    }
  ).then((data) => data.json());

  return data;
}

export async function getUser(id: string): Promise<UserObject | void> {
  const token = await getAccessToken();
  if ("access_token" in token) {
    let path = `${BASE_PATH}/users/${id}`;
    const data = await fetch(path, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    }).then((data) => data.json());
    return data;
  }
}

export async function getCurrentUserProfile(
  token: string
): Promise<UserObject | undefined> {
  const access_token = await refreshToken(token);
  if ((access_token as AccessToken).access_token) {
    let path = `${BASE_PATH}/me`;
    const data = await fetch(path, {
      headers: {
        Authorization: `Bearer ${(access_token as AccessToken).access_token}`
      }
    }).then((data) => data.json());
    return data;
  }
}

export async function getCurrentUserSavedAlbum(
  token: string
): Promise<AlbumObject[] | void> {
  const access_token = await refreshToken(token);
  if ("access_token" in access_token) {
    let path = `${BASE_PATH}/me/albums`;
    const data: { items: { album: AlbumObject }[] } = await fetch(path, {
      headers: { Authorization: `Bearer ${access_token.access_token}` }
    }).then((data) => data.json());

    return data.items.map((e) => e.album);
  }
}

export async function getCurrentUserFollowedArtist(
  token: string
): Promise<ArtistObject[] | void> {
  const access_token = await refreshToken(token);
  if ("access_token" in access_token) {
    let path = `${BASE_PATH}/me/following?type=artist`;
    const data: { artists: { items: ArtistObject[] } } = await fetch(path, {
      headers: { Authorization: `Bearer ${access_token.access_token}` }
    }).then((data) => data.json());

    return data.artists.items;
  }
}

export async function getFeaturedPlaylist(country?: string, locale?: string, timestamp?: Date, limit?: number, offset?: number): Promise<PlaylistObject[] | void> {
  const access_token = await getAccessToken();
  if ("access_token" in access_token) {
    let path = `${BASE_PATH}/browse/featured-playlists?`;
    if (country) path += `country=${country || 'US'}`;
    if (locale)
    path += `locale=${locale || 'en-US'}`;
    if (timestamp) path += `timestamp=${timestamp.toISOString()}`;
    if (limit) path += `limit=${limit}`;
    if (offset) path += `offset=${offset}`;
    const data: {playlists: {items: PlaylistObject[]}} | undefined = await fetch(path, {
      headers: { Authorization: `Bearer ${access_token.access_token}` }
    }).then((data) => data.json())
    .catch(e => {console.log(e)})

    if (data && 'playlists' in data) return data.playlists.items;
  }
}

export async function getCurrentUserPlaylist(
  token: string
): Promise<PlaylistObject[] | void> {
  const access_token = await refreshToken(token);
  if ("access_token" in access_token) {
    let path = `${BASE_PATH}/me/playlists`;
    const data = await fetch(path, {
      headers: { Authorization: `Bearer ${access_token.access_token}` }
    }).then((data) => data.json());

    return data.items;
  }
}

export async function getCurrentlyPlayingTrack(
  token: string
): Promise<TrackObject | void> {
  const access_token = await refreshToken(token);
  if ("access_token" in access_token) {
    let path = `${BASE_PATH}/me/player/currently-playing`;
    const data = await fetch(path, {
      headers: { Authorization: `Bearer ${access_token.access_token}` }
    })
      .then((data) => data.json())
      .catch((e) => {
        console.log(e);
      });

    if (data) return data.item;
  }
}

export async function getRecentlyPlayedTrack(
  token: string
): Promise<TrackObject[] | void> {
  const access_token = await refreshToken(token);
  if ("access_token" in access_token) {
    let path = `${BASE_PATH}/me/player/recently-played`;
    const data: { items: { track: TrackObject }[] } | undefined = await fetch(
      path,
      {
        headers: { Authorization: `Bearer ${access_token.access_token}` }
      }
    )
      .then((data) => {return data.json()})
      .catch((e) => {
        console.log(e);
      });

      console.log('ahsdghasivdnjknjkdsavjh')
      console.log(data)

    if (data && 'items' in data) return data.items.map((e) => e.track);
  }
}

export async function getArtist(ids: string[]): Promise<ArtistObject[] | void> {
  const token = await getAccessToken();
  if ("access_token" in token) {
    let path = `${BASE_PATH}/artists?ids=${ids.join(",")}`;
    const data = await fetch(path, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    }).then((data) => data.json());
    return data.artists;
  }
}

export async function getArtistAlbum(
  id: string,
  market?: string,
  include_groups?: string[],
  limit?: number,
  offset?: number
): Promise<AlbumObject[] | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/artists/${id}/albums?`;
  if (market) path += `market=${market}`;
  if (include_groups && include_groups.length > 0)
    path += `include_groups=${include_groups.join(",")}`;
  if (limit) path += `limit=${limit}`;
  if (offset) path += `offset=${offset}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());
  return data.items;
}

export async function getArtistTopTrack(
  id: string,
  market: string
): Promise<TrackObject[] | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/artists/${id}/top-tracks?market=${market}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  return data.tracks;
}

export async function getRelatedArtist(
  id: string
): Promise<ArtistObject[] | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/artists/${id}/related-artists`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  return data.artists;
}

export async function getPlaylist(
  id: string,
  fields?: string
): Promise<PlaylistObject | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/playlists/${id}`;
  if (fields && fields !== "") path += `?fields=${fields}`;
  const data = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  const owner = await getUser(data.owner.id);
  if (!owner) return;

  return { ...data, owner };
}

export async function getAlbum(id: string): Promise<AlbumObject | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/albums/${id}`;
  const data: AlbumObject = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  const artists = await getArtist(data.artists.map((e) => e.id));
  if (!artists) return;

  return { ...data, artists };
}

export async function getTrack(id: string): Promise<TrackObject | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/tracks/${id}`;
  const data: TrackObject = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  const artists = await getArtist(data.artists.map((e) => e.id));
  if (!artists) return;

  return { ...data, artists };
}

export async function getSingleBrowseCategories(
  id: string,
  country?: string,
  locale?: string
): Promise<CategoryObject | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/browse/categories/${id}?`;
  if (country) path += `country=${country}`;
  if (locale) path += `locale=${locale}`;

  const data: CategoryObject = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  return data;
}

export async function getSeveralBrowseCategories(
  country?: string,
  locale?: string,
  limit?: string,
  offset?: string
): Promise<CategoryObject[] | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/browse/categories?`;
  if (country) path += `country=${country}`;
  if (locale) path += `locale=${locale}`;
  if (limit) path += `limit=${limit}`;
  if (offset) path += `offset=${offset}`;

  const data: { categories: { items: CategoryObject[] } } = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  return data.categories.items;
}

export async function getCategoryPlaylists(
  id: string,
  country?: string,
  limit?: number,
  offset?: number
): Promise<PlaylistObject[] | void> {
  const token = await getAccessToken();
  if (!("access_token" in token)) return;

  let path = `${BASE_PATH}/browse/categories/${id}/playlists?`;
  if (country) path += `country=${country}`;
  if (limit) path += `limit=${limit}`;
  if (offset) path += `offset=${offset}`;

  const data: { playlists: { items: PlaylistObject[] } } = await fetch(path, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  }).then((data) => data.json());

  return data.playlists.items;
}
