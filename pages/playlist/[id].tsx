import { getPlaylist } from "@/components/stateSlice/SpotifyAPI";
import {
  PlaylistObject,
  UserObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import { GetServerSideProps } from "next";
import {
  FavoriteBorderRounded,
  DownloadRounded,
  MoreVert,
  Shuffle,
  PlayCircleRounded,
  AccountCircle
} from "@mui/icons-material";
import Image from "next/image";
import Song from "@/components/Playlist/Song";
import Link from "next/link";
import { Box, Stack } from "@mui/material";
import { GET_PLAYLIST } from "@/components/stateSlice/SpotifyAPI/fields";
import FilterComponent from "@/components/Playlist/FilterComponent";

export const getServerSideProps: GetServerSideProps<
  PlaylistObject | {}
> = async ({ params }) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data = await getPlaylist(params.id, GET_PLAYLIST);
    return { props: data };
  } else return { notFound: true };
};

const ActionButtonsComponent = () => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <FavoriteBorderRounded fontSize="large" />
    <DownloadRounded fontSize="large" />
    <MoreVert sx={{ marginRight: "auto" }} fontSize="large" />
    <Shuffle fontSize="large" />
    <PlayCircleRounded fontSize="large" />
  </div>
);

const PlaylistOwnerComponent = ({ owner }: { owner: UserObject }) => (
  <div
    style={{
      display: "flex",
      gap: "0.5rem",
      height: "1.5rem",
      alignItems: "center"
    }}>
    <div
      style={{
        height: "100%",
        aspectRatio: "1",
        borderRadius: "100px",
        overflow: "hidden"
      }}>
      {owner.images.length > 0 ? (
        <Image
          src={owner.images[0].url}
          fill
          style={{ objectFit: "contain" }}
          alt="image"
        />
      ) : (
        <AccountCircle fontSize="large" />
      )}
    </div>
    <Box
      component={Link}
      sx={{
        fontSize: "0.8rem",
        fontWeight: ({ typography }) => typography.fontWeightBold
      }}
      href={`/user/${owner.id}`}>
      {owner.display_name}
    </Box>
  </div>
);

export default function Id(PlaylistObject: PlaylistObject) {
  return (
    <Stack gap={3} sx={{ padding: "1rem" }}>
      <FilterComponent />
      <div style={{ height: "15rem", width: "100%" }}>
        <Image
          src={PlaylistObject.images[0].url}
          fill
          style={{ objectFit: "contain" }}
          alt="image"
        />
      </div>
      <Stack
        gap={1}
        sx={({ palette, typography }) => ({
          "& .description, & p": {
            color: typography.subtitle1.color,
            "& a": {
              color: palette.primary.main,
              borderColor: palette.primary.main,
              borderBottom: "1px solid"
            }
          }
        })}>
        <h2>{PlaylistObject.name}</h2>
        <Box
          dangerouslySetInnerHTML={{ __html: PlaylistObject.description }}
          sx={({ typography, palette }) => ({
            color: typography.subtitle1.color,
            fontSize: "0.8rem",
            "& a": {
              color: palette.primary.main,
              borderColor: palette.primary.main,
              borderBottom: "1px solid"
            }
          })}
        />
        <PlaylistOwnerComponent owner={PlaylistObject.owner} />
        <Box
          component={"p"}
          sx={({ typography }) => ({
            color: typography.subtitle1.color,
            fontSize: typography.subtitle1.fontSize
          })}>
          24h 60min
        </Box>
        <ActionButtonsComponent />
      </Stack>
      <Stack gap={2}>
        {PlaylistObject.tracks.map(({ track }) => (
          <Song key={track.id} track={track} />
        ))}
      </Stack>
    </Stack>
  );
}
