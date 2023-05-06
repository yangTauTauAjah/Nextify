import { DownloadForOfflineOutlined } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";

function InstallApp() {
  const Theme = useTheme();

  return (
    <Link href="/" legacyBehavior>
      <Box
        component="a"
        className="white-hover cursor-pointer flex items-center gap-1 shrink-0"
        sx={{ height: "3rem" }}>
        <DownloadForOfflineOutlined fontSize="medium" />
        <div>Install App</div>
      </Box>
    </Link>
  );
}

export default InstallApp;
