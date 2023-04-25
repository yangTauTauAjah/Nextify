import { getPlaylist } from '@/components/stateSlice/SpotifyAPI'
import { PlaylistObject } from '@/components/stateSlice/SpotifyAPI/interfaces'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps<PlaylistObject | {}> = async ({ params }) => {

  console.log(params)

  if (params?.id && !(params.id instanceof Array)) {
    const data = await getPlaylist(params.id)
    return { props: data }
  } else return { notFound: true }

}

export default function Id(PlaylistObject: PlaylistObject) {
  return (
    <code>{JSON.stringify(PlaylistObject)}</code>
  )
}