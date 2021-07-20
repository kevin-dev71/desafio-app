import Head from "next/head"
import { getData } from "../utils/fetchData"
import { useState } from "react"

import ProductItem from "../components/product/ProductItem"

export default function Home(props) {
  const [products, setProducts] = useState(props.products)

  return (
    <div>
      <Head>
        <title>Desafio App - Nextjs - Home Page</title>
      </Head>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => {
            return <ProductItem key={product._id} product={product} />
          })
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getData("products")
  return {
    props: {
      products: res,
      result: res.length,
    },
  }
}
