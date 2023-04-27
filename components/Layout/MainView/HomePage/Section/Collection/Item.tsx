import { Box, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ItemInterface {
  type?: "playlist" | "artist";
  href: string;
  image: string;
  title: string;
  description: React.ReactNode | React.ReactNode[];
}

const ItemStyle = {
  flexShrink: "0",
  padding: "1rem",
  gap: "0.7rem",
  width: "15rem",
  borderRadius: "0.3rem",
  transition: "background 100ms ease-in-out",
  background: "rgba(255,255,255,0.05)",
  "&:hover": {
    background: "rgba(255,255,255,0.1)"
  }
};

function Item({
  type = "playlist",
  href,
  title,
  image,
  description
}: ItemInterface) {
  return (
    <Stack
      component={Link}
      href={href}
      sx={{
        ...ItemStyle,
        fontWeight: (theme) => theme.typography.fontWeightLight
      }}>
      <div
        style={{
          boxShadow: "2px 22px 126px -29px rgba(0,0,0,0.5)",
          flexShrink: "0",
          overflow: "hidden",
          aspectRatio: "1",
          width: "auto",
          borderRadius: type === "artist" ? "100%" : "0.5rem"
        }}>
        <Image sizes="10vw" src={image} fill alt="image" />
      </div>
      <h3 style={{ fontSize: "1rem", marginTop: "1rem" }}>{title}</h3>
      {description}
    </Stack>
  );
}

export default Item;
