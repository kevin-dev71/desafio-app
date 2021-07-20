import { useRouter } from 'next/router'
import { useState, useContext, useEffect } from "react"
import {DataContext} from '../store/globalState'
import Cookie from 'js-cookie'
import {postData} from '../utils/fetchData'
import { ACTIONS } from '../store/actions'

const Login = () => {

  const initialState = {
    
    email: "",
    password: ""
  }
  const {state, dispatch} = useContext(DataContext)
  const [userData, setUserData] = useState(initialState)
  const { auth } = state

  const router = useRouter()

  const { email, password } = userData

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    dispatch({ type: ACTIONS.NOTIFY , payload: {loading: true}})

    const res = await postData('auth/signin' , userData)

    if(res.err) return dispatch({ type: ACTIONS.NOTIFY, payload: {error: res.err}})

    dispatch({ type: ACTIONS.NOTIFY , payload: {success: res.msg}})

    dispatch({ type: ACTIONS.AUTH , payload: {token: res.access_token, user: res.user}})

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)

  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  )
}

export default Login
