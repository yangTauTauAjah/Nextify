import { RootState } from "@/components/store";
import { Box } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NavLink(props: {
  link: Array<{ href: string; icon: React.ReactNode; text: string }>;
}) {
  const active = useSelector((state: RootState) => state.data.activeLink);

  return (
    <Box
      className="flex justify-between items-center w-full"
      sx={{
        padding: "0.7rem"
      }}>
      {props.link.map((e, i) => (
        <Link key={i} href={e.href} legacyBehavior>
          <a
            className="flex flex-col items-center"
            style={{
              fontSize: "0.8rem",
              gap: "0.3rem",
              color: i === active ? "white" : "rgba(150, 150, 150, 1)"
            }}
            target={i === 3 ? "_blank" : undefined}
            rel={i === 3 ? "noopener noreferrer" : undefined}>
            {e.icon}
            <p>{e.text}</p>
          </a>
        </Link>
      ))}
    </Box>
  );
}
