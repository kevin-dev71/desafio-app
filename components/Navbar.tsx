import Link from "next/link"
import { useContext } from "react"
import { DataContext } from "../store/globalState"
import { ACTIONS } from "../store/actions"
import { ShoppingCartIcon } from "@heroicons/react/solid"

const Navbar = () => {
  const loggedRouter = () => {
    return (
      <div className="hidden md:flex items-center space-x-1">
        <Link href="/cart">
          <button className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
            <a href="#" role="button" className="relative flex">
              <ShoppingCartIcon className="flex-1 w-8 h-8 fill-current" />
              <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                {cart.length}
              </span>
            </a>
          </button>
        </Link>
        <Link href="/login">
          <a className="py-5 px-3">{auth.user.name}</a>
        </Link>

        <a
          className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </a>
      </div>
    )
  }

  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state

  const handleLogout = () => {
    localStorage.removeItem("firstLogin")
    dispatch({ type: ACTIONS.AUTH, payload: {} })
    dispatch({ type: ACTIONS.NOTIFY, payload: { success: "Logged Out!" } })
  }

  return (
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link href="/">
                <a className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900 font-bold">
                  Desafio App
                </a>
              </Link>
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <a className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  Catalogue
                </a>
              </Link>
            </div>
          </div>
          {/* secondary nav */}
          {Object.keys(auth).length === 0 ? (
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/login">
                <a className="py-5 px-3">Login</a>
              </Link>
              <Link href="/register">
                <a className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">
                  Signup
                </a>
              </Link>
            </div>
          ) : (
            loggedRouter()
          )}

          {/* mobile button goes here */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className="mobile-menu hidden md:hidden">
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Features
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
      </div>
    </nav>
  )
}

export default Navbar
