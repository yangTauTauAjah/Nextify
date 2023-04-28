import { Box, Stack, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/components/store";
import {
  AccountCircle,
  DownloadRounded,
  FavoriteBorderRounded,
  MoreVert,
  PlayCircle,
  Shuffle
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import {
  AlbumObject,
  ArtistObject,
  CollectionType,
  ComponentTypeInterface,
  PlaylistObject,
  TrackObject,
  UserObject
} from "@/components/stateSlice/SpotifyAPI/interfaces";
import { useEffect } from "react";

interface CollectionOwnerComponentInterface {
  owners: {
    type: "artist" | "user";
    id: string;
    name: string;
    image_url: string;
  }[];
}

const Wrapper = styled(Stack)(({ theme }) => ({
  "& .description, & p": {
    color: theme.typography.subtitle1.color,
    "& a": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      borderBottom: "1px solid"
    }
  }
}));

const Description = styled(Box)(({ theme: { typography, palette } }) => ({
  color: typography.subtitle1.color,
  fontSize: "0.8rem",
  "& a": {
    color: palette.primary.main,
    borderColor: palette.primary.main,
    borderBottom: "1px solid"
  }
}));

const Duration = styled("p")(({ theme: { typography } }) => ({
  color: typography.subtitle1.color,
  fontSize: typography.subtitle1.fontSize
}));

const ActionButtonsComponent = () => (
  <div
    style={{
      display: "flex",
      gap: "0.7rem",
      alignItems: "center"
    }}>
    <FavoriteBorderRounded className="cursor-pointer" fontSize="medium" />
    <DownloadRounded className="cursor-pointer" fontSize="medium" />
    <MoreVert
      className="cursor-pointer"
      sx={{ marginRight: "auto" }}
      fontSize="medium"
    />
    <Shuffle className="cursor-pointer" fontSize="medium" />
    <PlayCircle
      className="cursor-pointer"
      sx={{ fontSize: "3rem", color: ({ palette }) => palette.primary.main }}
    />
  </div>
);

const CollectionOwnerComponent = ({
  owners
}: CollectionOwnerComponentInterface) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        height: "1.5rem",
        alignItems: "center"
      }}>
      <div
        style={{
          height: "100%",
          aspectRatio: "1",
          borderRadius: "100px",
          overflow: "hidden"
        }}>
        {owners.length > 0 ? (
          <Image
            sizes="10vw"
            src={owners[0].image_url}
            fill
            style={{ objectFit: "contain" }}
            alt="image"
          />
        ) : (
          <AccountCircle fontSize="large" />
        )}
      </div>
      {owners.map(({ type, id, name }) => (
        <Box
          key={id}
          component={Link}
          sx={{
            fontSize: "0.8rem",
            fontWeight: ({ typography }) => typography.fontWeightBold,
            "&::before": { background: "white" }
          }}
          href={`/${type}/${id}`}>
          {name}
        </Box>
      ))}
    </div>
  );
};

const CollectionMetadata = ({ type = "playlist" }: ComponentTypeInterface) => {
  let collection = useSelector((state: RootState) => state.data[type]) as
    | AlbumObject
    | PlaylistObject
    | TrackObject
    | undefined;

  return (
    <Wrapper gap={1}>
      <h2>{collection?.name}</h2>
      <Description
        className="cursor-default"
        dangerouslySetInnerHTML={{
          __html:
            type === "playlist"
              ? (collection as PlaylistObject)?.description
              : ""
        }}
      />
      <CollectionOwnerComponent
        owners={
          type === "playlist"
            ? [
                {
                  type: "user",
                  id: (collection as PlaylistObject)?.owner.id,
                  name: (collection as PlaylistObject)?.owner.display_name,
                  image_url: (collection as PlaylistObject)?.owner.images[0].url
                }
              ]
            : (collection as AlbumObject | TrackObject)?.artists.map(
                ({ type, id, name, images }) => ({
                  type,
                  id,
                  name,
                  image_url: images[0].url
                })
              ) || []
        }
      />
      <Duration>24h 60min</Duration>
      <ActionButtonsComponent />
    </Wrapper>
  );
};

export default CollectionMetadata;
