import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from "react"
import {DataContext} from '../store/globalState'

import valid from '../utils/valid'
import {postData} from '../utils/fetchData'
import { ACTIONS } from '../store/actions'

const Register = () => {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
  }
  const {state, dispatch} = useContext(DataContext)
  const [userData, setUserData] = useState(initialState)
  const { auth } = state

  const router = useRouter()

  const { name, password, email, surname, address } = userData

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errMsg = valid(name, surname, email, password, address)

    if(errMsg) return dispatch({ type: ACTIONS.NOTIFY, payload: {error: errMsg} })

    dispatch({ type: ACTIONS.NOTIFY , payload: {loading: true}})

    const res = await postData('auth/signup' , userData)

    if(res.err) return dispatch({ type: ACTIONS.NOTIFY, payload: {error: res.err}})

    return dispatch({ type: ACTIONS.NOTIFY , payload: {success: 'Ok'}})
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
              autoComplete="off"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Last Name"
              name="surname"
              value={surname}
              onChange={handleChangeInput}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={handleChangeInput}
              autoComplete="off"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-address"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address"
              type="text"
              placeholder="Address 1"
              name="address"
              value={address}
              onChange={handleChangeInput}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
