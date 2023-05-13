import { getSeveralBrowseCategories, search } from "@/components/request";
import {
  AlbumObject,
  ArtistObject,
  CategoryObject,
  PlaylistObject,
  TrackObject
} from "@/components/interfaces";

import {useTheme, Box, InputBase, styled, alpha, Stack} from "@mui/material";

import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import {
  setActiveLink,
  setNowPlaying
} from "@/components/stateSlice/SpotifyAPI";
import { KeyboardEvent, useEffect } from "react";
import Backlight from "@/components/Layout/MainView/Backlight";
import Song from "@/components/Layout/MainView/CollectionDisplay/Track";
import {
  Collection,
  TextComponent
} from "@/components/Layout/MainView/HomePage";
import { useRouter } from "next/router";

interface SearchDataInterface {
  category: CategoryObject[];
  search: {
    artists: ArtistObject[];
    albums: AlbumObject[];
    playlists: PlaylistObject[];
    tracks: TrackObject[];
  };
}

export const getServerSideProps: GetServerSideProps<
  SearchDataInterface
> = async ({ query }) => {
  let { country, locale, limit, offset, q } = query;
  if (
    !(country instanceof Array) &&
    !(locale instanceof Array) &&
    !(limit instanceof Array) &&
    !(offset instanceof Array)
  ) {
    let limitNum;
    let offsetNum;

    if (limit) limitNum = Number.parseInt(limit);
    if (offset) offsetNum = Number.parseInt(offset);

    const data: SearchDataInterface = {
      category: [],
      search: {
        albums: [],
        artists: [],
        playlists: [],
        tracks: []
      }
    };

    const category = await getSeveralBrowseCategories(
      country,
      locale,
      limitNum,
      offsetNum
    );

    if (category) data.category = category;

    if (typeof q === "string") {
      const searchResult = await search(q, [
        "album",
        "artist",
        "playlist",
        "track"
      ]);
      if (searchResult) data.search = searchResult;
    }

    if (data) return { props: data };
  }
  return { notFound: true };
};

const SearchComponent = styled("div")(({ theme }) => ({
  position: "relative",
  marginInline: '1rem',
  width: "auto",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15)
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width")
  }
}));

export default function Search(props: SearchDataInterface) {
  const router = useRouter();
  const Theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveLink(1));
  }, [dispatch]);

  return (
    <Box>
      <Backlight />
      <h1 className="px-1 my-1">Search</h1>
      <SearchComponent
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Enter") return;
          /* @ts-ignore */
          if (!e.target.value || e.target.value === "") return;
          /* @ts-ignore */
          router.push(`/search?q=${e.target.value}`);
        }}
        className="mx-1">
        <SearchIconWrapper>
          <Icon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Find in playlist"
          inputProps={{ "aria-label": "search" }}
        />
      </SearchComponent>
      <Box>
        {props.search.tracks.length > 0 && (
          <Stack
            sx={{
              padding: "1rem",
              gap: "1rem"
            }}>
            <h1 style={{ marginBlock: "1rem" }}>Songs</h1>
            {props.search.tracks.map((e) => {
              return (
                <Song
                  key={e.id}
                  onClick={() => dispatch(setNowPlaying(e))}
                  id={e.id}
                  name={e.name}
                  album={e.album}
                  artists={e.artists}
                  duration_ms={e.duration_ms}
                  explicit={e.explicit}
                />
              );
            })}
          </Stack>
        )}
        {props.search.playlists.length > 0 && (
          <Collection
            title="Playlists"
            collection={props.search.playlists.map((e) => ({
              id: e.id,
              description: <TextComponent>{e.description}</TextComponent>,
              name: e.name,
              image: e.images[0].url,
              type: e.type
            }))}
          />
        )}
        {props.search.albums.length > 0 && (
          <Collection
            title="Albums"
            collection={props.search.albums.map((e) => ({
              id: e.id,
              description: (
                <TextComponent>
                  {e.release_date}&nbsp;&#x2022;&nbsp;
                  {e.artists.reduce(
                    (acc: JSX.Element[], curr, index, array) => {
                      acc.push(
                        <Box
                          component={Link}
                          sx={{
                            "&::before": {
                              background: ({ typography }) =>
                                typography.subtitle1.color
                            }
                          }}
                          key={2 * index}
                          href={`/artist/${curr.id}`}>
                          {curr.name}
                        </Box>
                      );
                      if (index !== array.length - 1) {
                        acc.push(<span key={2 * (index + 1)}>,&nbsp;</span>);
                      }
                      return acc;
                    },
                    []
                  )}
                </TextComponent>
              ),
              name: e.name,
              image: e.images[0].url,
              type: e.type
            }))}
          />
        )}
        {props.search.artists.length > 0 && (
          <Collection
            title="Artists"
            collection={props.search.artists.map((e) => {
              return {
                id: e.id,
                description: <TextComponent>Artist</TextComponent>,
                name: e.name,
                image: e.images[0]?.url,
                type: e.type
              };
            })}
          />
        )}
      </Box>
      <div className="p-1 pb-10">
        <h3 style={{ fontSize: "1rem" }}>Categories</h3>
        <Box
          className="grid gap-1 mt-1"
          sx={{
            gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))",
            [Theme.breakpoints.up("sm")]: {
              gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))"
            }
          }}>
          {props.category.map((e) => {
            return (
              <Box
                key={e.id}
                component={Link}
                href={`/categories/${e.id}`}
                className="flex items-center"
                sx={{
                  overflow: "hidden",
                  aspectRatio: "2",
                  width: "100%",
                  background: alpha("rgb(255,255,255)", 0.1),
                  borderRadius: "5px"
                }}>
                <div className="aspect-square h-full">
                  <Image
                    className="aspect-square object-cover"
                    fill
                    src={e.icons[0].url}
                    alt="img"
                  />
                </div>
                <p className="px-1">{e.name}</p>
              </Box>
            );
          })}
        </Box>
      </div>
    </Box>
  );
}
