import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

export default function Page() {
  const Theme = useTheme();

  return (
    <Stack
      className="gap-1 items-center justify-center"
      sx={{
        height: "100vh",
          height: "100%"
        }
      }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: Theme.typography.h3.fontSize,
          fontWeight: Theme.typography.fontWeightMedium || "500"
        }}>
        Coming soon.
      </Typography>
      <Button
        href='/'
        color="primary"
        variant="contained"
        sx={{
          borderRadius: "10rem",
          padding: "0.5rem 2rem",
          fontSize: "1rem",
          letterSpacing: "2px"
        }}>
        Back To Home
      </Button>
    </Stack>
  );
}
