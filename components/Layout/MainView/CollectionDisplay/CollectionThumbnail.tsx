import { AlbumObject, PlaylistObject } from "@/components/interfaces";
import { LibraryMusic } from "@mui/icons-material";
import { Box, styled } from "@mui/material";
import Image from "next/image";

const Wrapper = styled(Box)(({ theme }) => ({
  aspectRatio: "1",
  flexShrink: "0",
  height: "15rem",
  width: "100%",
  background: "rgba(45, 45, 45, 1)",
  [theme.breakpoints.up("sm")]: {
    width: "unset"
  }
}));

const PlaylistThumbnail = ({
  collection
}: {
  collection: PlaylistObject | AlbumObject;
}) => {
  return (
    <Wrapper>
      {collection?.images[0]?.url ? (
        <Image
          src={collection.images[0].url}
          fill
          style={{ objectFit: "contain" }}
          alt="image"
        />
      ) : (
        <LibraryMusic
          sx={{ fontSize: "15rem", color: "rgba(120, 120, 120, 1)" }}
        />
      )}
    </Wrapper>
  );
};

export default PlaylistThumbnail;
