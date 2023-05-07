import { Button, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

function Page() {

  const Theme = useTheme()

  return (
    <Stack
      className="gap-1 items-center justify-center"
      sx={{ height: "100vh", [Theme.breakpoints.up('sm')]: {
        height: '100%'
      } }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: Theme.typography.h2.fontSize,
          fontWeight: Theme.typography.fontWeightBold || "500"
        }}>
        Page not found
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: Theme.typography.h4.fontSize,
          fontWeight: Theme.typography.fontWeightLight || "300"
        }}>
        We can’t seem to find the page you are looking for.
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
        Home
      </Button>
    </Stack>
  )
}

export default Page