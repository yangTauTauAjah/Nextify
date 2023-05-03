import {
  /* MainView, */ Collection
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
  Launch
} from "@mui/icons-material";
import { Box, Stack, styled, useTheme } from "@mui/material";
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
    let artists = null
    if (req.cookies.refresh_token) artists = ((await getUserTopItem(req.cookies.refresh_token, "artists")) || null) as ArtistObject[] | null;

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
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.value
  );
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
    /* <Parent>
      {
        screenWidth !== 'xs' && <>
          <Sidebar />
          <NowPlayingBar />
        </>
        <MainView /> */
    <Stack className="pb-10" sx={{ gap: "1.5rem", padding: "1rem" }}>
      <Recent
        message={data.featuredPlaylist.message}
        playlists={data.featuredPlaylist.playlists}
      />
      {data.categories.map((e) => {
        return (
          <Collection
            key={e.category}
            title={e.category}
            collection={e.playlists}
          />
        );
      })}
      {/* {data.artists && <Collection title="Artist" collection={data.artists} />} */}
      {/*<Collection title="Top List" collection={TopList.playlists.items} />
      <Collection title="Discover" collection={Discover.playlists.items} />
      <Collection title="Country" collection={Country.playlists.items} />
      <Collection title="Indie" collection={Indie.playlists.items} />
      <Collection title="Gaming" collection={Gaming.playlists.items} />
      <Collection title="Mood" collection={Mood.playlists.items} />
      <Collection title="Pop" collection={Pop.playlists.items} />
      <Collection title="Artist" type="artist" collection={Artist.artists} />*/}
    </Stack>
    /*
        {screenWidth === 'xs' && <MobileWidget />
      <MobileWidget />}
    </Parent> */
  );
}

/* export async function getServerSideProps() {

  if (!isAuthorized) {
    return {
      redirect: {
        destination: 'https://accounts.spotify.com/authorize?response_type=code&client_id=b6f05292d14148a08f5e70d8fe2ba898&scope=user-read-private user-read-email user-modify-playback-state&redirect_uri=http://localhost:3000&state=34fFs29kd09',
        permanent: false,
      },
    }
  }
  return {
    props: {}
  }
} */
