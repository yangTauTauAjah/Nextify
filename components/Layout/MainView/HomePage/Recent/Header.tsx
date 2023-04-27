import { Fab, styled } from "@mui/material";
import React from "react";

const ExtendedFab = styled(Fab)({
  background: "rgba(255,255,255,0.1)",
  paddingInline: "1rem",
  textTransform: "unset",
  color: "white",
  "&:hover": { background: "rgba(255,255,255,0.2)" }
});

function StickyElement() {
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
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
