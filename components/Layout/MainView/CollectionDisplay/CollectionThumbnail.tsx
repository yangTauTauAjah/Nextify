import { AlbumObject, PlaylistObject } from "@/components/interfaces";
import { Box, styled } from "@mui/material";
import Image from "next/image";

const Wrapper = styled(Box)({
  height: "15rem",
  width: "100%"
});

const PlaylistThumbnail = ({ collection }: {collection: PlaylistObject | AlbumObject}) => {

  return (
    <Wrapper>
      <Image
        src={collection?.images[0].url || ""}
        fill
        style={{ objectFit: "contain" }}
        alt="image"
      />
    </Wrapper>
  );
};

export default PlaylistThumbnail;
