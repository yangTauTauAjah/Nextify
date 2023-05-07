import { Box, alpha } from '@mui/material';
import React from 'react'


function Backlight() {
  return (
    <Box
      component="span"
      className="w-full absolute top-0 left-0"
      sx={{
        height: "70vh",
        background: ({ palette }) =>
          `linear-gradient(180deg, ${alpha(
            palette.primary.main,
            0.5
          )} 0%, rgba(0, 0, 0, 0) 100%)`
      }}
    />
  );
}

export default Backlight