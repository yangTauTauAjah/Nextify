import { RootState } from "@/components/store";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Song, { SongComponentInterface } from "./Track";
import { CollectionType } from "@/components/interfaces";

const Tracks = ({
  type = "playlist",
  sx
}: {
  type?: CollectionType;
  sx?: any;
}) => {
  let collection = useSelector((state: RootState) => state.data[type]);

  let data: SongComponentInterface[] = [];

  if (collection?.type === "album") {
    collection?.tracks.items.map((e) => {
      const { id, name, artists, album, explicit, duration_ms } = e;
      data.push({ id, name, artists, album, explicit, duration_ms });
    });
  } else if (collection?.type === "playlist") {
    collection?.tracks.items.forEach((e) => {
      const { id, name, album, artists, explicit, duration_ms } = e.track;
      data.push({ id, name, album, artists, explicit, duration_ms });
    });
  }

  return (
    <Stack sx={sx} gap={2}>
      {data.map(({ id, name, album, artists, explicit, duration_ms }) => (
        <Song
          key={id}
          id={id}
          name={name}
          artists={artists}
          album={album}
          duration_ms={duration_ms}
          explicit={explicit}
        />
      ))}
    </Stack>
  );
};

export default Tracks;
