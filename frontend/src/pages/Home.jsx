import React, { useEffect, useState } from 'react'
import {Row , Col} from 'react-bootstrap'
// import products from "../products"
import Product from "../components/Product"
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import axios from "axios"

const Home = () => {
  const {data: products , isLoading , error} = useGetProductsQuery()
  // const [products , setProducts] = useState([])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // } , [])

  return (
    <>
      {/* {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Error</h2>} */}
      {isLoading ? (
         <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
              {products?.map(product => (
                  <Col key={product.name} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              )) }
          </Row>
        </>
      )}
        {/* <h1>Latest Products</h1>
        <Row>
            {products?.map(product => (
                <Col key={product.name} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            )) }
        </Row> */}
    </>
  )
}

export default Home