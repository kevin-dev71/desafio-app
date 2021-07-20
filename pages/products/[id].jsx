import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/globalState'
// import { addToCart } from '../../store/actions'

const DetailProduct = (props) => {
    const [product] = useState(props.product)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    return(
        <div className="row detail_page">
            <Head>
                <title>Product detail</title>
            </Head>
        {product.name}
        <img src={product.imgUrl} alt="" />
            
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`products/${id}`)
    // server side rendering
    return {
      props: { product: res }, // will be passed to the page component as props
    }
}


export default DetailProduct