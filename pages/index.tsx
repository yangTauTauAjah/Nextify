import {
  /* MainView, */ Collection,
  TextComponent
} from "@/components/Layout/MainView/HomePage";
import Recent from "@/components/Layout/MainView/HomePage/Recent";
import MobileWidget from "@/components/Layout/MobileWidget";
import NowPlayingBar from "@/components/Layout/NowPlayingBar";
import Sidebar from "@/components/Layout/Sidebar";
import { forceResize } from "@/components/stateSlice/screenWidth";
import { RootState } from "@/components/store";
import {
  Home,
  Search,
  LibraryMusic,
  DownloadForOfflineOutlined,
  Favorite,
  FavoriteBorder,
  PictureInPictureAlt,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  SkipPrevious,
  SkipNext,
  PlayCircle,
  StopCircle,
  Repeat,
  QueueMusic,
  DevicesOther,
  VolumeUp,
  VolumeOff,
  Launch,
  GradingRounded
} from "@mui/icons-material";
import { Box, Stack, alpha, styled, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material/styles/createTypography";
import TopList from "@/data/categories/toplist.json";
import Discover from "@/data/featured_6.json";
import Country from "@/data/categories/Country.json";
import Indie from "@/data/categories/Indie.json";
import Gaming from "@/data/categories/Gaming.json";
import Mood from "@/data/categories/Mood.json";
import Pop from "@/data/categories/Pop.json";
import Artist from "@/data/recommendations/artists.json";
import { setActiveLink } from "@/components/stateSlice/SpotifyAPI";
import { ArtistObject, PlaylistObject } from "@/components/interfaces";
import {
  getArtist,
  getCategoryPlaylists,
  getFeaturedPlaylist,
  getSeveralBrowseCategories,
  getUserTopItem
} from "@/components/request";
import { GetServerSideProps } from "next";
import Greeting from "@/components/Layout/MainView/HomePage/Recent/Greeting";
import Header from "@/components/Layout/MainView/HomePage/Recent/Header";
import SongList from "@/components/Layout/MainView/HomePage/Recent/SongList";
import Backlight from "@/components/Layout/MainView/Backlight";

interface IndexPageDataInterface {
  featuredPlaylist: {
    message: string;
    playlists: PlaylistObject[];
  };
  categories: {
    category: string;
    playlists: PlaylistObject[];
  }[];
  artists: ArtistObject[] | null;
}

export const getServerSideProps: GetServerSideProps<
  IndexPageDataInterface
> = async ({ req }) => {
  const categories = await getSeveralBrowseCategories("US", "en-US", 8);
  const featuredPlaylist = await getFeaturedPlaylist("US", "en-US");
  let artists = null;
  if (req.cookies.refresh_token)
    artists = ((await getUserTopItem(req.cookies.refresh_token, "artists")) ||
      null) as ArtistObject[] | null;

  if (categories && featuredPlaylist) {
    let data = [];

    for (let i = 0; i < categories.length; i++) {
      const playlists = await getCategoryPlaylists(categories[i].id);
      if (playlists) data.push({ category: categories[i].name, playlists });
    }

    return {
      props: {
        featuredPlaylist: {
          message: featuredPlaylist.message,
          playlists: featuredPlaylist.playlists
        },
        artists,
        categories: data
      }
    };
  }

  return { notFound: true };
};

export default function Main(data: IndexPageDataInterface) {
  const Theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const { xs, sm, md, lg, xl } = Theme.breakpoints.values;

    window.addEventListener("resize", function () {
      if (window.innerWidth > xs && window.innerWidth <= sm)
        dispatch(forceResize("xs"));
      else if (window.innerWidth > sm && window.innerWidth <= md)
        dispatch(forceResize("sm"));
      else if (window.innerWidth > md && window.innerWidth <= lg)
        dispatch(forceResize("md"));
      else if (window.innerWidth > lg && window.innerWidth <= xl)
        dispatch(forceResize("lg"));
      else dispatch(forceResize("xl"));
    });
  }, [Theme.breakpoints.values, dispatch]);

  useEffect(() => {
    dispatch(setActiveLink(0));
  }, [dispatch]);

  return (
    <Stack
      className="pb-10"
      sx={{
        gap: "1.5rem",
        height: "100vh",
        [Theme.breakpoints.up("sm")]: {
          height: "100%"
        }
      }}>
      <Backlight />
      <Stack
        sx={{
          padding: "1rem",
          gap: "1rem",
          zIndex: "10",
          position: "sticky",
          top: "calc(-1 * (37px + 3rem))",
          background: "rgba(15, 15, 15, 0.7)",
          borderBottom: "solid 2px rgba(10, 10, 10, 1)",
          backdropFilter: "blur(5px)"
        }}>
        <Greeting message={data.featuredPlaylist.message} />
        <Header />
      </Stack>
      <SongList playlists={data.featuredPlaylist.playlists} />
      {data.categories.map((e) => {
        return (
          <Collection
            key={e.category}
            title={e.category}
            collection={e.playlists
              .filter((e) => !!e)
              .map((e) => {
                return {
                  id: e.id,
                  description: <TextComponent>{e.description}</TextComponent>,
                  name: e.name,
                  image: e.images[0].url,
                  type: e.type
                };
              })}
          />
        );
      })}
      <Collection
        title="Artists"
        collection={
          data.artists
            ?.filter((e) => !!e)
            .map((e) => {
              return {
                id: e.id,
                description: <TextComponent>Artist</TextComponent>,
                name: e.name,
                image: e.images[0].url,
                type: e.type
              };
            }) || []
        }
      />
    </Stack>
  );
}

/* <Parent>
      {
        screenWidth !== 'xs' && <>
          <Sidebar />
          <NowPlayingBar />
        </>
        <MainView /> */

/*
        {screenWidth === 'xs' && <MobileWidget />
      <MobileWidget />}
    </Parent> */
