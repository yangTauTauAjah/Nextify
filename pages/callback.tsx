import { getAccessToken } from "@/components/request";
import { GetServerSideProps } from "next";

export const timeToSec = (
  sec: number = 0,
  min: number = 0,
  hour: number = 0,
  day: number = 0,
  month: number = 0
): number => sec + 60 * (min + 60 * (hour + 24 * (day + month * 30)));

export const getServerSideProps: GetServerSideProps<{}> = async ({
  query,
  res
}) => {
  let code = query["code"];
  if (code && !(code instanceof Array) && code !== "") {
    const token = await getAccessToken(code);

    if ("refresh_token" in token) {
      res.setHeader("set-cookie", [
        `refresh_token=${token.refresh_token};Max-Age=${timeToSec(
          0,
          0,
          0,
          3
        )};Secure;HttpOnly`
      ]);
    }
  }

  return { props: {}, redirect: { destination: "/" } };
};

export default function Callback() {
  return <div />;
}
