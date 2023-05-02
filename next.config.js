const access_scope = [
  "playlist-read-private",
  "user-modify-playback-state",
  "user-library-read",
  "user-library-modify",
  "user-follow-read",
  "user-read-email user-read-private",
  "user-read-currently-playing",
  "user-read-recently-played"
];
const REDIRECT_URI = "http://localhost:3000/callback";

const AUTH_URL = `
https://accounts.spotify.com/authorize
?response_type=code
&client_id=${process.env.CLIENT_ID}
&scope=${encodeURI(access_scope.join(" "))}
&redirect_uri=${REDIRECT_URI}
`.replace(/[\s\t\n\r]/g, "");

/** @type {import('next').NextConfig} */
/* const {randomBytes} = require('crypto')
const {REDIRECT_URI} = require('./components/stateSlice/SpotifyAPI/index.ts') */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: AUTH_URL,
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
