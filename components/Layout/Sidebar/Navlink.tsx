import { RootState } from "@/components/store";
import { Box, useTheme } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NavLink({
  link
}: {
  link: { href: string; icon: React.ReactNode; text: string }[];
}) {
  const Theme = useTheme();
  const state = useSelector((state: RootState) => state.data);

  return (
    <Box
      className="flex flex-col justify-between items-start w-full gap-1 pb-1"
      sx={{ borderBottom: "solid 1px rgba(255,255,255,.1)" }}>
      {link.map((e, i) => (
        <Link key={i} href={e.href} legacyBehavior>
          <Box
            className={`flex flex-row items-center gap-1 cursor-pointer ${
              state.activeLink !== i ? "white-hover" : ""
            }`}
            component="a"
            sx={{ fontSize: "1rem" }}>
            {e.icon}
            <p>{e.text}</p>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
