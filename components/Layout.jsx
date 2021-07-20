import Navbar from './Navbar'
import Notify from './Notify'

const Layout = ({children}) => {
  return (
    <>
    <Navbar />
    <Notify />
    <main className="container mx-auto">
      {children}
    </main>
    </>
  )
}

export default Layout