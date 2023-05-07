import { getAlbum } from "@/components/request";
import { AlbumObject } from "@/components/interfaces";
import { GetServerSideProps } from "next";
import { Box, Stack, useTheme } from "@mui/material";
import PlaylistThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
import PlaylistMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";
import Backlight from "@/components/Layout/MainView/Backlight";

export const getServerSideProps: GetServerSideProps<AlbumObject> = async ({
  params
}) => {
  if (params?.id && !(params.id instanceof Array)) {
    const data = await getAlbum(params.id);
    if (data) return { props: data };
  }

  return { notFound: true };
};

export default function Id(AlbumObject: AlbumObject) {
  const Theme = useTheme();

  return (
    <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
      <Backlight />
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
        <PlaylistThumbnail collection={AlbumObject} />
        <PlaylistMetadata type="Album" collection={AlbumObject} />
      </Box>
      <Tracks collection={AlbumObject} />
    </Stack>
  );
}
