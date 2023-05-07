import { getPlaylist } from "@/components/request";
import { PlaylistObject } from "@/components/interfaces";
import { GetServerSideProps } from "next";
import { Box, Stack, useTheme } from "@mui/material";
import { GET_PLAYLIST } from "@/components/fields";
import FilterComponent from "@/components/Layout/MainView/CollectionDisplay/FilterComponent";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";
import Backlight from "@/components/Layout/MainView/Backlight";
import { useEffect, useMemo, useRef, useState } from "react";

export const getServerSideProps: GetServerSideProps<PlaylistObject> = async ({
  params
}) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data = await getPlaylist(params.id, GET_PLAYLIST);
    if (data) return { props: data };
  }
  return { notFound: true };
};

export default function Id(PlaylistObject: PlaylistObject) {
  const [word, setWord] = useState(new RegExp("", "i"));
  const [sort, setSort] = useState<"title" | "artist">("title");
  const Theme = useTheme();

  const Songs = useRef([...PlaylistObject.tracks.items]);

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <Backlight />
      <FilterComponent setWord={setWord} setSort={setSort} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          [Theme.breakpoints.up("sm")]: {
            flexDirection: "row",
            alignItems: "end",
            gap: "3rem"
          }
        }}>
        <PlaylistThumbnail collection={PlaylistObject} />
        <PlaylistMetadata type="Playlist" collection={PlaylistObject} />
      </Box>
      <Tracks
        collection={(() => {
          PlaylistObject.tracks.items = Songs.current.filter(
            (e) => !!word.exec(e.track.name)
          );

          if (sort === "title") {
            PlaylistObject.tracks.items.sort((a, b) => {
              if (a.track.name < b.track.name) {
                return -1;
              }
              if (a.track.name > b.track.name) {
                return 1;
              }
              return 0;
            });
          } else if (sort === "artist") {
            PlaylistObject.tracks.items.sort((a, b) => {
              if (a.track.artists[0].name < b.track.artists[0].name) {
                return -1;
              }
              if (a.track.artists[0].name > b.track.artists[0].name) {
                return 1;
              }
              return 0;
            });
          }

          return PlaylistObject;
        })()}
      />
    </Stack>
  );
}
