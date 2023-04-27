import { Search } from "@mui/icons-material";
import { InputBase, Stack, alpha, styled } from "@mui/material";
import React from "react";

const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  width: "100%",
  gap: "0.5rem",
  cursor: "default",
  "& > div": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    }
  }
}));

const SearchComponent = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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

const Button = styled('div')(({theme}) => ({
  paddingInline: "1rem",
  display: "flex",
  alignItems: "center",
  fontWeight: theme.typography.fontWeightMedium,
}));

const FilterComponent = () => (
  <Container>
    <SearchComponent>
      <SearchIconWrapper>
        <Search />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Find in playlist" inputProps={{ "aria-label": "search" }} />
    </SearchComponent>
    <Button><p>Sort</p></Button>
  </Container>
);

export default FilterComponent;
