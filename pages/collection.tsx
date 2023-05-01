import {
  getCurrentUserFollowedArtist,
  getCurrentUserPlaylist,
  getCurrentUserProfile,
  getCurrentUserSavedAlbum
} from "@/components/stateSlice/SpotifyAPI";
import {
  AlbumObject,
  ArtistObject,
  PlaylistObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import {
  AccountCircle,
  Add,
  LibraryMusic,
  MoreVert,
  PlusOne,
  Search
} from "@mui/icons-material";
import { Button, Fab, Stack, Typography, styled } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Music from "@/public/music_icon.svg";
import Link from "next/link";
import { parseCookie } from "./_app";
import { useSelector } from "react-redux";
import { RootState } from "@/components/store";

interface LibraryDataInterface {
  // user: UserObject;
  albums: AlbumObject[];
  artists: ArtistObject[];
  playlists: PlaylistObject[];
}

export const getServerSideProps: GetServerSideProps<
  LibraryDataInterface | {}
> = async ({ req }) => {
  if (!req.headers.cookie) return { props: {} };
  const cookies = parseCookie(req.headers.cookie);

  if (!cookies.refresh_token) return { props: {} };

  const code = cookies.refresh_token;
  // const user = await getCurrentUserProfile(code);
  const albums = await getCurrentUserSavedAlbum(code);
  const artists = await getCurrentUserFollowedArtist(code);
  const playlists = await getCurrentUserPlaylist(code);

  if (/* !user || */ !albums || !artists || !playlists) return { props: {} };

  const data: LibraryDataInterface = {
    // user,
    albums,
    artists,
    playlists
  };

  return { props: data };
};

const ExtendedFab = styled(Fab)({
  background: "rgba(255,255,255,0.1)",
  paddingInline: "1rem",
  textTransform: "unset",
  color: "white",
  "&:hover": { background: "rgba(255,255,255,0.2)" }
});

function GoToLoginPrompt() {
  return (
    <Stack
      className="gap-2 items-center justify-center"
      sx={{ height: "100vh" }}>
      <Typography
        component="h3"
        sx={{
          textAlign: "center",
          fontSize: (theme) => theme.typography.h4,
          fontWeight: (theme) => theme.typography.fontWeightLight || "300"
        }}>
        Login to get full experience
      </Typography>
      <Button
        color="primary"
        variant="contained"
        sx={{
          borderRadius: "10rem",
          padding: "0.5rem 2rem",
          fontSize: "1rem",
          letterSpacing: "2px"
        }}>
        Login
      </Button>
    </Stack>
  );
}

export default function Collection(data: LibraryDataInterface | {}) {
  let user = useSelector((state: RootState) => state.data.user);

  if ("albums" in data && user) {
    return (
      <>
        <Stack sx={{ padding: "1rem" }}>
          <div className="flex items-center my-1 gap-1">
            <div className="aspect-square rounded-full overflow-hidden h-2">
              {user.images[0]?.url ? (
                <Image
                  className="aspect-square h-full object-cover"
                  src={user.images[0].url}
                  alt="img"
                  fill
                />
              ) : (
                <AccountCircle
                  className="aspect-square h-full"
                  sx={{ fontSize: "2rem" }}
                />
              )}
            </div>
            <h1 className="mr-auto">Your Library</h1>
            <Search sx={{ fontSize: "2rem" }} />
            <Add sx={{ fontSize: "2rem" }} />
          </div>
          <div className="sticky flex top-0 py-1/2 gap-1/2">
            <ExtendedFab size="small" variant="extended">
              Album
            </ExtendedFab>
            <ExtendedFab size="small" variant="extended">
              Artist
            </ExtendedFab>
            <ExtendedFab size="small" variant="extended">
              Playlist
            </ExtendedFab>
          </div>
        </Stack>
        <Stack className="p-1 gap-1 pb-10">
          {data.playlists.map((e) => {
            return (
              <Link
                key={e.id}
                href={`/playlist/${e.id}`}
                className="flex w-full items-center gap-1 h-4">
                <div
                  style={{
                    display: e.images[0]?.url ? "initial" : "flex",
                    background: "rgba(255, 255, 255, 0.1)"
                  }}
                  className="aspect-square h-full overflow-hidden items-center justify-center">
                  {e.images[0]?.url ? (
                    <Image
                      className="object-cover"
                      src={e.images[0].url}
                      alt="img"
                      fill
                    />
                  ) : (
                    <LibraryMusic
                      sx={{ fontSize: "3rem", color: "rgba(120, 120, 120, 1)" }}
                    />
                  )}
                </div>
                <div className="mr-auto">
                  <p>{e.name}</p>
                  <div
                    style={{
                      color: "rgba(255,255,255,.8)",
                      marginTop: "0.3rem"
                    }}>
                    <span style={{ fontSize: "0.8rem" }}>Playlist</span>
                    <span style={{ fontSize: "0.6rem" }}>
                      &nbsp;&#x2022;&nbsp;
                    </span>
                    <span style={{ fontSize: "0.8rem" }}>
                      {e.owner.display_name}
                    </span>
                  </div>
                </div>
                <MoreVert />
              </Link>
            );
          })}
          {data.artists.map((e) => {
            return (
              <Link
                key={e.id}
                href={`/artist/${e.id}`}
                className="flex w-full items-center gap-1 h-4">
                <div className="aspect-square h-full overflow-hidden rounded-full">
                  <Image
                    className="object-cover"
                    src={e.images[0].url}
                    alt="img"
                    fill
                  />
                </div>
                <div className="mr-auto">
                  <p>{e.name}</p>
                  <div
                    style={{
                      color: "rgba(255,255,255,.8)",
                      marginTop: "0.3rem"
                    }}>
                    <span style={{ fontSize: "0.8rem" }}>Artist</span>
                  </div>
                </div>
                <MoreVert />
              </Link>
            );
          })}
          {data.albums.map((e) => {
            return (
              <Link
                key={e.id}
                href={`/album/${e.id}`}
                className="flex w-full items-center gap-1 h-4">
                <div className="aspect-square h-full overflow-hidden">
                  <Image
                    className="object-cover"
                    src={e.images[0].url}
                    alt="img"
                    fill
                  />
                </div>
                <div className="mr-auto">
                  <p>{e.name}</p>
                  <div
                    style={{
                      color: "rgba(255,255,255,.8)",
                      marginTop: "0.3rem"
                    }}>
                    <span style={{ fontSize: "0.8rem" }}>Album</span>
                  </div>
                  <span style={{ fontSize: "0.8rem" }}>Artist</span>
                  <span style={{ fontSize: "0.6rem" }}>
                    &nbsp;&#x2022;&nbsp;
                  </span>
                  <span style={{ fontSize: "0.8rem" }}>
                    {e.artists.map((e) => e.name)}
                  </span>
                </div>
                <MoreVert />
              </Link>
            );
          })}
        </Stack>
      </>
    );
  } else {
    return <GoToLoginPrompt />;
  }
}
