/* import Navbar from './navbar'
import Footer from './footer' */

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <div>Hello world, this is a header component</div>
      <main>{children}</main>
      <div>Hello earth, this is a footer component</div>
    </>
  )
}