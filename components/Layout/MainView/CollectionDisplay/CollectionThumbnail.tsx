import {
  CollectionType,
  ComponentTypeInterface
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import { RootState } from "@/components/store";
import { Box, styled } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";

const Wrapper = styled(Box)({
  height: "15rem",
  width: "100%"
});

const PlaylistThumbnail = ({ type = "playlist" }: ComponentTypeInterface) => {
  let collection = useSelector((state: RootState) => state.data[type]);
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
