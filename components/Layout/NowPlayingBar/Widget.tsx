import { FavoriteBorder, PictureInPictureAlt } from "@mui/icons-material";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";


export default function Widget() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      gap: '1rem'
    }}>
      <Box sx={{
        height: '100%',
        aspectRatio: '1'
      }}>
        <Image src="" alt="music"/>
      </Box>
      <div>
        <Link href='/' legacyBehavior>
          <a>Test</a>
        </Link>
        <div>
          <Link href='/' legacyBehavior>
            <a>Test</a>
          </Link>
          {", "}
          <Link href='/' legacyBehavior>
            <a>Test</a>
          </Link>
        </div>
      </div>
      <FavoriteBorder fontSize="small" />
      <PictureInPictureAlt fontSize="small" />
    </Box>
  )
}