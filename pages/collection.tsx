import {
  getCurrentUserFollowedArtist,
  getCurrentUserPlaylist,
  getCurrentUserSavedAlbum
} from "@/components/request";
import {
  AlbumObject,
  ArtistObject,
  PlaylistObject
} from "@/components/interfaces";
import {
  AccountCircle,
  Add,
  LibraryMusic,
  MoreVert,
  Search
} from "@mui/icons-material";
import { Button, Fab, Stack, Typography, styled } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/store";
import React, { useEffect } from "react";
import { setActiveLink } from "@/components/stateSlice/SpotifyAPI";
import { parseCookie } from "@/components/functions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

interface LibraryDataInterface {
  albums: AlbumObject[];
  artists: ArtistObject[];
}

export function LoginAlert({
  open,
  handleClose
}: {
  open: boolean;
  handleClose?: () => any;
}) {
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          In order for this application to work properly, we need to collect
          your Spotify data from the official Spotify API. And to do so, you
          would later need to accept{" "}
          <a href="https://developer.spotify.com/terms">
            Spotify Developer Terms of Service
          </a>
          . Are you sure you want to proceed to login?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} autoFocus>
          Go Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/login");
          }}>
          Proceed To Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export const getServerSideProps: GetServerSideProps<
  LibraryDataInterface | {}
> = async ({ req }) => {
  if (!req.headers.cookie) return { props: {} };
  const cookies = parseCookie(req.headers.cookie);

  if (!cookies.refresh_token) return { props: {} };

  const code = cookies.refresh_token;
  const albums = await getCurrentUserSavedAlbum(code);
  const artists = await getCurrentUserFollowedArtist(code);
  const playlists = await getCurrentUserPlaylist(code);

  if (!albums || !artists || !playlists) return { props: {} };

  const data: LibraryDataInterface = {
    albums,
    artists
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      className="gap-2 items-center justify-center"
      sx={{ height: "100vh" }}>
      <LoginAlert open={open} handleClose={handleClose} />
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
        onClick={handleClickOpen}
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

export default function Collection(
  data: (LibraryDataInterface & { savedPlaylist?: PlaylistObject[] }) | {}
) {
  let user = useSelector((state: RootState) => state.data.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveLink(2));
  }, [dispatch]);

  if ("albums" in data && user && data.savedPlaylist) {
    return (
      <div>
        <Stack
          sx={{ zIndex: "10", background: "rgba(15, 15, 15, 1)" }}
          className="p-1 sticky top-0">
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
          {data.savedPlaylist.map((e) => {
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
      </div>
    );
  } else {
    return <GoToLoginPrompt />;
  }
}
