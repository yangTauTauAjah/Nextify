import {
  getCurrentUserFollowedArtist,
  getCurrentUserPlaylist,
  getCurrentUserProfile,
  getCurrentUserSavedAlbum
} from "@/components/stateSlice/SpotifyAPI";
import {
  AlbumObject,
  ArtistObject,
  PlaylistObject,
  UserObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import {
  AccountCircle,
  Add,
  LibraryMusic,
  MoreVert,
  PlusOne,
  Search
} from "@mui/icons-material";
import { Fab, Stack, styled } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Music from "@/public/music_icon.svg";
import Link from "next/link";

interface LibraryDataInterface {
  user: UserObject;
  albums: AlbumObject[];
  artists: ArtistObject[];
  playlists: PlaylistObject[];
}

export const getServerSideProps: GetServerSideProps<
  LibraryDataInterface
> = async () => {
  const code =
    "AQBtH8yyCxqy7mf4N1JKsxuSKR-8tMf2GqeE8dDyaNuqlhJdd2N4OXcW1SnyvRqYI3ZjVdqv2db8JpSLNpt6Nl_bY-nWHDcB2PJPCdwiJdHPpSEBAT7KlOPzLgJ698Nvn_I";
  const data: LibraryDataInterface = {
    user: await getCurrentUserProfile(code),
    albums: await getCurrentUserSavedAlbum(code),
    artists: await getCurrentUserFollowedArtist(code),
    playlists: await getCurrentUserPlaylist(code)
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

export default function Collection(data: LibraryDataInterface) {
  return (
    <>
      <Stack sx={{ padding: "1rem" }}>
        <div
          className="flex items-center"
          style={{ marginBlock: "1rem", gap: "1rem" }}>
          <div className="aspect-square" style={{ height: "2rem" }}>
            {data.user.images[0]?.url ? (
              <Image
                className="aspect-square h-full object-cover"
                src={data.user.images[0].url}
                alt="img"
                fill
              />
            ) : (
              <AccountCircle className="aspect-square h-full" sx={{fontSize: '2rem'}} />
            )}
          </div>
          <h1 className="mr-auto">Your Library</h1>
          <Search sx={{ fontSize: "2rem" }} />
          <Add sx={{ fontSize: "2rem" }} />
        </div>
        <div
        className="sticky flex top-0"
          style={{
            position: "sticky",
            top: "0",
            display: "flex",
            gap: "0.5rem",
            paddingBlock: "0.5rem"
          }}>
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
      <Stack sx={{ padding: "1rem", gap: "1rem" }}>
        {data.playlists.map((e) => {
          return (
            <Link
              key={e.id}
              href={`/playlist/${e.id}`}
              className="flex w-full items-center"
              style={{ gap: "1rem", height: "4rem" }}>
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
              className="flex w-full items-center"
              style={{ gap: "1rem", height: "4rem" }}>
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
              className="flex w-full items-center"
              style={{ gap: "1rem", height: "4rem" }}>
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
                <span style={{ fontSize: "0.6rem" }}>&nbsp;&#x2022;&nbsp;</span>
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
}
