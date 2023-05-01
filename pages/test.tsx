export function getServerSideProps() {
  return {props: {data: 'Hello World, this is login page'}}
}

export default function Test({data}: {data: string}) {
  return <div style={{fontSize: '1rem'}}>{data}</div>
}