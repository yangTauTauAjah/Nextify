// import { getArtistTopTrack, getTrack } from "@/components/request";
// import { PlaylistObject, TrackObject } from "@/components/interfaces";
// import { GetServerSideProps } from "next";

import ComingSoon from "@/components/Layout/ComingSoon";

// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import {useTheme} from "@mui/material";

// import CollectionThumbnail from "@/components/Layout/MainView/CollectionDisplay/CollectionThumbnail";
// import CollectionMetadata from "@/components/Layout/MainView/CollectionDisplay/CollectionMetadata";
// import Tracks from "@/components/Layout/MainView/CollectionDisplay/CollectionTracks";
// import Backlight from "@/components/Layout/MainView/Backlight";

// export interface TrackCollectionInterface {
//   trackData: TrackObject;
//   topTrackByArtist: TrackObject[];
// }

// export const getServerSideProps: GetServerSideProps<PlaylistObject> = async ({
//   params,
//   query
// }) => {
//   if (params?.id && !(params.id instanceof Array)) {
//     const track = await getTrack(params.id);

//     if (!track) return { notFound: true };

//     const {
//       id,
//       name,
//       artists: [artist],
//       album
//     } = track;

//     if (!(query["locale"] instanceof Array)) {
//       const tracks = await getArtistTopTrack(
//         artist.id,
//         query["locale"] || "US"
//       );

//       if (!tracks) return { notFound: true };

//       const props: PlaylistObject = {
//         type: "playlist",
//         id,
//         name,
//         description: "",
//         owner: {
//           id: artist.id,
//           display_name: artist.name,
//           images: artist.images,
//           type: "user"
//         },
//         images: album.images,
//         tracks: {
//           items: tracks.map((e) => ({
//             track: {
//               id: e.id,
//               name: e.name,
//               album: e.album,
//               artists: e.artists,
//               duration_ms: e.duration_ms,
//               explicit: e.explicit
//             }
//           }))
//         }
//       };

//       return { props };
//     }
//   }

//   return { notFound: true };
// };

// export default function Id(data: PlaylistObject) {
//   const Theme = useTheme();

//   return (
//     <Stack className="pb-10" gap={3} sx={{ padding: "2rem 1rem" }}>
//       <Backlight />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "1.5rem",
//           [Theme.breakpoints.up("sm")]: {
//             flexDirection: "row",
//             alignItems: "end",
//             gap: "3rem"
//           }
//         }}>
//         <CollectionThumbnail collection={data} />
//         <CollectionMetadata
//           type="Song"
//           name={data.name}
//           description={data.description}
//           owners={[
//             {
//               ...data.owner,
//               type: "artist",
//               name: data.owner.display_name,
//             }
//           ]}
//         />
//       </Box>
//       <section>
//         <div>
//           <Box
//             component="p"
//             sx={{ color: ({ typography }) => typography.subtitle1.color }}>
//             Popular Tracks by
//           </Box>
//         </div>
//         <h1 style={{ marginBlock: "0.7rem", fontSize: "1.7rem" }}>
//           {data.owner.display_name}
//         </h1>
//         <Tracks collection={data} sx={{ marginTop: "2rem" }} />
//       </section>
//     </Stack>
//   );
// }

export default ComingSoon