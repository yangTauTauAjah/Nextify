import { Box, Fab, Stack, styled } from "@mui/material";
import React from "react";
import Recent from "./Recent";
import Section from "./Section";
import Item from "./Section/Collection/Item";
import { Typography } from "@mui/material/styles/createTypography";
import TopList from "@/data/categories/toplist.json";
import Discover from "@/data/featured_6.json";
import Country from "@/data/categories/Country.json";
import Indie from "@/data/categories/Indie.json";
import Gaming from "@/data/categories/Gaming.json";
import Mood from "@/data/categories/Mood.json";
import Pop from "@/data/categories/Pop.json";
import Artist from "@/data/recommendations/artists.json";
import {
  ArtistObject,
  ImageObject,
  PlaylistObject,
  UserObject
} from "@/components/interfaces";

const TextComponent = styled("p")(({ theme: { typography } }) => ({
  fontSize: typography.subtitle1.fontSize,
  fontWeight: typography.fontWeightRegular,
  color: typography.subtitle1.color,
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  WebkitLineClamp: "2",
  overflow: "hidden"
}));

export const Collection = ({
  title,
  collection
}: {
  title: string;
  collection: PlaylistObject[] | ArtistObject[];
}) => (
  <Section style={{padding: '1rem'}} title={title}>
    {collection.map((props) => {
      // console.log(props)
      if (!props?.type) return
      if (props.type === "artist") {
        const { id, images, name, type } = props;
        return (
          <Item
            key={id}
            image={images[0].url}
            title={name}
            href={`/artist/${id}`}
            type={type}
            description={<TextComponent>Artist</TextComponent>}
          />
        );
      } else {
        const { id, images, name, description, type } = props;
        return (
          <Item
            key={id}
            image={images[0].url}
            title={name}
            href={`/playlist/${id}`}
            type={type}
            description={<TextComponent>{description}</TextComponent>}
          />
        );
      }
    })}
  </Section>
);

/* function MainView() {
  return (
    
  );
}

export default MainView;
 */
