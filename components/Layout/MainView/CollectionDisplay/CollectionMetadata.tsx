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
  PlaylistObject,
  TrackObject,
  UserObject
} from "@/components/interfaces";
import { Box, Stack, Typography, styled, useTheme } from "@mui/material";

interface CollectionOwnerComponentInterface {
  type: "artist" | "user";
  id: string;
  name: string;
  image_url: string;
}

interface CollectionMetadaComponentInterface {
  name: string;
  description: string;
  owners: ArtistObject[] | UserObject[];
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

const Duration = styled("p")(({ theme }) => ({
  color: theme.typography.subtitle1.color,
  fontSize: theme.typography.subtitle1.fontSize,
  [theme.breakpoints.up("sm")]: {
    display: "none"
  }
}));

const ActionButtonsComponent = () => {
  const Theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.7rem",
        alignItems: "center",
        [Theme.breakpoints.up("sm")]: {
          display: "none"
        }
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
    </Box>
  );
};

const CollectionOwnerComponent = ({
  owners
}: {
  owners: { image?: string; type: string; name: string; id: string }[];
}) => {
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
        {owners[0].image && owners[0].image !== "" ? (
          <Image
            sizes="10vw"
            src={owners[0].image}
            fill
            style={{ objectFit: "contain" }}
            alt="image"
          />
        ) : (
          <AccountCircle sx={{ aspectRatio: "1", height: "100%" }} />
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

const CollectionMetadata = ({
  type,
  name,
  description,
  owners
}: {
  type: string;
  name: string;
  owners: ArtistObject[] | UserObject[];
  description: string;
}) => {
  const Theme = useTheme();

  return (
    <Wrapper gap={1}>
      <Typography
        variant="h1"
        sx={{
          display: "none",
          [Theme.breakpoints.up("sm")]: {
            display: "unset",
            fontSize: "1rem",
            fontWeight: Theme.typography.fontWeightBold
          }
        }}>
        {type}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: Theme.typography.h5.fontSize,
          fontWeight: Theme.typography.fontWeightMedium,
          [Theme.breakpoints.up("sm")]: {
            fontSize: "5rem",
            fontWeight: Theme.typography.fontWeightBold
          }
        }}>
        {name}
      </Typography>
      <Description
        className="cursor-default"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {owners.length > 0 && (
        <CollectionOwnerComponent
          owners={owners.map((e) => {
            return {
              id: e.id,
              name: e.type === 'artist' ? e.name : e.display_name,
              type: e.type,
              image: e.images[0].url
            };
          })}
        />
      )}
      <Duration>24h 60min</Duration>
      <ActionButtonsComponent />
    </Wrapper>
  );
};

export default CollectionMetadata;
