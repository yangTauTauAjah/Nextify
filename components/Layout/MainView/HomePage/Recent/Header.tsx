import { Fab, alpha, styled } from "@mui/material";
import React from "react";

const ExtendedFab = styled(Fab)(({theme}) => ({
  background: 'rgb(35, 35, 35)',
  paddingInline: "1rem",
  textTransform: "unset",
  color: "white",
  "&:hover": { background: 'rgb(70, 70, 70)' }
}));

function StickyElement() {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        paddingBlock: "0.5rem"
      }}>
      <ExtendedFab size="small" variant="extended">
        Music
      </ExtendedFab>
      <ExtendedFab size="small" variant="extended">
        Podcast & Shows
      </ExtendedFab>
    </div>
  );
}

export default StickyElement;
