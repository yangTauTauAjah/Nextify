import { getPlaylist } from "@/components/request";
import { PlaylistObject } from "@/components/interfaces";
import { GetServerSideProps } from "next";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useTheme} from "@mui/material";

import { GET_PLAYLIST } from "@/components/fields";
import FilterComponent from "@/components/Layout/MainView/CollectionDisplay/FilterComponent";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";
import Backlight from "@/components/Layout/MainView/Backlight";
import { useEffect, useState } from "react";

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
  const [filteredData, setFilteredData] = useState(PlaylistObject);
  const Theme = useTheme();

  useEffect(() => {
    let _ = {
      ...PlaylistObject,
      tracks: {
        items: PlaylistObject.tracks.items.filter(
          (e) => !!word.exec(e.track.name)
        )
      }
    };

    if (sort === "title") {
      _.tracks.items = _.tracks.items.sort((a, b) => {
        if (a.track.name < b.track.name) {
          return -1;
        }
        if (a.track.name > b.track.name) {
          return 1;
        }
        return 0;
      });
    } else if (sort === "artist") {
      _.tracks.items = _.tracks.items.sort((a, b) => {
        if (a.track.artists[0].name < b.track.artists[0].name) {
          return -1;
        }
        if (a.track.artists[0].name > b.track.artists[0].name) {
          return 1;
        }
        return 0;
      });
    }

    setFilteredData(_);
  }, [PlaylistObject, word, sort]);

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
        <PlaylistThumbnail collection={filteredData} />
        <PlaylistMetadata
          type="Playlist"
          name={filteredData.name}
          description={filteredData.description}
          owners={[filteredData.owner]}
        />
      </Box>
      <Tracks collection={filteredData} />
    </Stack>
  );
}
