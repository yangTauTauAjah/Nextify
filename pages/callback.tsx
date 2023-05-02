import { getAccessToken } from "@/components/request";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async ({query, res}) => {

  let code = query['code']
  if (code && !(code instanceof Array) && code !== '') {

    const token = await getAccessToken(code)
    
    if ('refresh_token' in token) {
      res.setHeader('set-cookie', [
        `refresh_token=${token.refresh_token};Max-Age=3600;Secure;HttpOnly`
      ])
    }
    
  }

  return { props: {}, redirect: {destination: '/', } };
};

export default function Callback() {
  return <div />
}