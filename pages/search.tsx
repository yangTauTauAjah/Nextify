

import { getSeveralBrowseCategories } from "@/components/request";
import { CategoryObject } from "@/components/interfaces";
import { Box, InputBase, styled, alpha } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search as Icon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setActiveLink } from "@/components/stateSlice/SpotifyAPI";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps<{
  data: CategoryObject[];
}> = async ({ query }) => {
  let { country, locale, limit, offset } = query;
  if (
    !(country instanceof Array) &&
    !(locale instanceof Array) &&
    !(limit instanceof Array) &&
    !(offset instanceof Array)
  ) {

    let limitNum
    let offsetNum

    if (limit) limitNum = Number.parseInt(limit)
    if (offset) offsetNum = Number.parseInt(offset)

    const data = await getSeveralBrowseCategories(
      country,
      locale,
      limitNum,
      offsetNum
    );

    if (data) return { props: { data } };
  }
  return { notFound: true };
};

const SearchComponent = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  [theme.breakpoints.up("sm")]: {
    width: "auto"
  }
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

export default function Search(props: { data: CategoryObject[] }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveLink(1))
  }, [dispatch])
  return (
    <>
      <h1 className="px-1 my-1">Search</h1>
      <SearchComponent className="mx-1">
        <SearchIconWrapper>
          <Icon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Find in playlist"
          inputProps={{ "aria-label": "search" }}
        />
      </SearchComponent>
      <div className="p-1 pb-10">
        <h3 style={{ fontSize: "1rem" }}>Categories</h3>
        <Box
          className="grid gap-1 mt-1"
          sx={{
            gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))"
          }}>
          {props.data.map((e) => {
            return (
              <Box
                key={e.id}
                component={Link}
                href={`/categories/${e.id}?t=${e.name}`}
                className="flex items-center"
                sx={{
                  overflow: "hidden",
                  aspectRatio: "2",
                  width: "100%",
                  background: alpha('rgb(255,255,255)', 0.1),
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
    </>
  );
}
