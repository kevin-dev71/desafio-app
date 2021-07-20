import { useContext, useState, useEffect } from "react"
import { DataContext } from "../store/globalState"

import CartHeader from "../components/cart/CartHeader"
import CartItem from "../components/cart/CartItem"
import ContinueShoppingButton from "../components/cart/ContinueShoppingButton"
import OrderSummary from "../components/cart/OrderSummary"
const safelyRoundMoney = (amount) => +Math.round(amount).toFixed(2);
const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + safelyRoundMoney(item.price * item.quantity)
      },0)

      setTotal(res)
    }

    getTotal()
  },[cart])

  // TODO useEffect compare localStorage cart with server to check stock

  if (cart.length === 0) return <h2>Not items in cart</h2>

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <CartHeader itemQty={cart.length} />
          {
                cart.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                ))
              }
          <ContinueShoppingButton />
        </div>
        <OrderSummary dispatch={dispatch} auth={auth} cart={cart} total={total} />
      </div>
    </div>
  )
}

export default Cart
