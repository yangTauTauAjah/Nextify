import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SongStyle = {
  overflow: "hidden",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  height: "5rem",
  borderRadius: "0.3rem",
  background: "rgba(255,255,255,0.05)",
  transition: "100ms background ease-in-out",
  "&:hover": {
    background: "rgba(255,255,255,0.1)"
  }
};

interface SongInterface {
  title: string;
  image: string;
  href: string;
}

const Song = ({ title, image, href }: SongInterface) => (
  <Link href={href} legacyBehavior>
    <Box className="cursor-pointer" component="a" sx={SongStyle}>
      <div style={{ aspectRatio: "1", position: "relative", height: "100%" }}>
        <Image
          sizes="10vw"
          src={image}
          fill
          style={{ objectFit: "cover" }}
          alt="image"
        />
      </div>
      <Box
        component="p"
        sx={{ fontWeight: ({ typography }) => typography.fontWeightMedium }}>
        {title}
      </Box>
    </Box>
  </Link>
);

export default Song;
