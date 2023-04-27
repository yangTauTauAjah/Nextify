import { CollectionType } from "@/components/stateSlice/SpotifyAPI/interfaces";
import { RootState } from "@/components/store";
import { Box } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";

const PlaylistThumbnail = ({
  type = "playlist"
}: {
  type?: CollectionType;
}) => {
  let collection = useSelector((state: RootState) => state.data[type]);
  return (
    <Box
      sx={{
        height: "15rem",
        width: "100%"
      }}>
      <Image
        src={collection?.images[0].url || ""}
        fill
        style={{ objectFit: "contain" }}
        alt="image"
      />
    </Box>
  );
};

export default PlaylistThumbnail;
