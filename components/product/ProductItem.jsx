import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/globalState'
import { addToCart } from '../../store/actions'
import Image from 'next/image'

const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const userLink = () => {
      return(
          <>
              <Link href={`products/${product._id}`}>
                  <a className="py-2 px-3 bg-gray-100 hover:bg-gray-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300 text-center"
                  style={{marginRight: '5px', flex: 1}}>View</a>
              </Link>
              <button className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300 text-center"
              style={{marginLeft: '5px', flex: 1}}
              disabled={product.inStock === 0 ? true : false} 
              onClick={() => dispatch(addToCart(product, cart))} >
                  Add to Cart
              </button>
          </>
      )
  }

    return(
      <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
  <Image
    className="w-full max-w-sm max-h-44 object-cover"
    src={product.imgUrl}
    alt="Sunset in the mountains"
  />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{product.name}</div>
    
  </div>
  <div className="px-6 py-4">
    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
      ${product.price}
    </span>
    
    <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
      In stock: {product.stock}
    </span>
  </div>
  <div className="mx-6 my-4 flex justify-between items-center">
  { userLink() }
  </div>
</div>
    )
}

export default ProductItem