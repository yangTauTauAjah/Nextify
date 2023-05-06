import { setActiveLink } from "@/components/stateSlice/SpotifyAPI";
import { RootState } from "@/components/store";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function NavLink(props: {
  link: Array<{ href: string; icon: React.ReactNode; text: string }>;
}) {
  const active = useSelector((state: RootState) => state.data.activeLink);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.7rem",
        width: "100%"
      }}>
      {props.link.map((e, i) => (
        <Link key={i} href={e.href} legacyBehavior>
          <a style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "0.8rem",
              gap: "0.3rem",
              alignItems: "center",
              color: i === active ? "white" : "rgba(150, 150, 150, 1)"
            }}>
            {e.icon}
            <p>{e.text}</p>
          </a>
        </Link>
      ))}
    </Box>
  );
}
