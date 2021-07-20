import { useState } from 'react'
import { decrease, increase } from "../../store/actions"
import Modal from '../Modal'
import Image from 'next/image'

const CartItem = ({ item, dispatch, cart }) => {
  const [modal, setModal] = useState(false)

  const handleSubmit = () => {
    dispatch({
      type: 'ADD_MODAL', payload: {data: cart, id: item._id, title: item.name}
    })
    setModal(true)

  }
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      {modal && <Modal open={modal} setModal={setModal} />}
      <div className="flex w-2/5">
        {" "}
        {/* product */}
        <div className="w-20">
          <Image
            className="h-24"
            src={item.imgUrl}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.name}</span>
          <span className="text-red-500 text-xs">Stock: {item.stock}</span>
          <a
            className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
            onClick={handleSubmit}
          >
            Remove
          </a>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button
          className="cursor-pointer"
          onClick={() => dispatch(decrease(cart, item._id))}
          disabled={item.quantity === 1 ? true : false}
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>

        <input
          className="mx-2 border text-center w-8"
          type="text"
          value={item.quantity}
        />

        <button
          className="cursor-pointer"
          onClick={() => dispatch(increase(cart, item._id))}
          disabled={item.quantity === item.stock ? true : false}
        >
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">${item.price}</span>
      <span className="text-center w-1/5 font-semibold text-sm">${item.price}</span>
    </div>
  )
}

export default CartItem
