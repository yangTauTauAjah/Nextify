import { timeToSec } from "@/components/functions";
import { getAccessToken } from "@/components/request";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
  res.setHeader("set-cookie", [`refresh_token=;Max-Age=0`]);

  return { props: {}, redirect: { destination: "/" } };
};

export default function Callback() {
  return <div />;
}
