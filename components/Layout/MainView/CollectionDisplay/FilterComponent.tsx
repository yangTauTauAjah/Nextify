import { Search } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  alpha,
  styled
} from "@mui/material";
import React, { useState } from "react";

function SimpleDialog({
  open,
  close,
  setSort
}: {
  open: boolean;
  close: (...params: any[]) => any;
  setSort: (...params: any[]) => any;
}) {
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>Filter by</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton
            sx={{ paddingBlock: "0", minWidth: "15rem" }}
            onClick={() => {
              setSort("title");
              close();
            }}>
            <ListItemText primary="Title" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            sx={{ paddingBlock: "0", minWidth: "15rem" }}
            onClick={() => {
              setSort("artist");
              close();
            }}>
            <ListItemText primary="Artist name" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

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
  flexGrow: "1",
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
  flexGrow: "1",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width")
  }
}));

const Button = styled("div")(({ theme }) => ({
  paddingInline: "1rem",
  display: "flex",
  alignItems: "center",
  fontWeight: theme.typography.fontWeightMedium
}));

const FilterComponent = ({
  setWord,
  setSort
}: {
  setWord: (...params: any[]) => any;
  setSort: (...params: any[]) => any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SimpleDialog
        open={open}
        close={() => setOpen(false)}
        setSort={setSort}
      />
      <Container>
        <SearchComponent
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            /* @ts-ignore */
            setWord(new RegExp(e.target.value, "i"));
          }}>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Find in playlist"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchComponent>
        <Button onClick={() => setOpen(true)}>
          <p>Sort</p>
        </Button>
      </Container>
    </>
  );
};

export default FilterComponent;
