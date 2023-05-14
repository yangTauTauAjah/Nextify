import Item from "@/components/Layout/MainView/HomePage/Section/Collection/Item";
import {
  getCategoryPlaylists,
  getSingleBrowseCategories
} from "@/components/request";
import { PlaylistObject } from "@/components/interfaces";

import Box from "@mui/material/Box";

import { GetServerSideProps } from "next";
import Backlight from "@/components/Layout/MainView/Backlight";

export const getServerSideProps: GetServerSideProps<{
  category: string;
  data: PlaylistObject[];
}> = async ({ params }) => {
  if (params && "id" in params && params.id && !(params.id instanceof Array)) {
    const category = await getSingleBrowseCategories(params.id);
    const data = await getCategoryPlaylists(params.id);

    if (data && category) return { props: { category: category.name, data } };
  }

  return { notFound: true };
};

export default function Id(props: {
  category: string;
  data: PlaylistObject[];
}) {
  const { category, data } = props;
  return (
    <div className="p-1 pb-10">
      <Backlight />
      <h1
        style={{ fontSize: "2rem", marginBlock: "2rem", marginInline: "1rem" }}>
        {category}
      </h1>
      <Box
        className="grid gap-1 mt-1"
        sx={{
          gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
          justifyItems: "center"
        }}>
        {data.map((e) => {
          return (
            <Item
              key={e.id}
              href={`/playlist/${e.id}`}
              title={e.name}
              image={e.images[0].url}
              description={e.description}
              type="playlist"
            />
          );
        })}
      </Box>
    </div>
  );
}