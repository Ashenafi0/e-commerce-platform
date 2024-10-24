import React, { useEffect, useState } from 'react'
import {Link, useParams , useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'
import "../custom-css/product-detail.css"
import axios from 'axios'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'

const ProductDetail = () => {
    // const [product, setProduct] = useState([])
    const {id: productId} = useParams()
    const [qty, setQty] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const numericProductId = Number(productId);
    const {data: product , isLoading , error} = useGetProductDetailsQuery(productId)

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };
 
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);
    //         setProduct(data);
    //     }

    //     fetchProduct()
    // } , [productId])

    
    // const product = products.find(product => product._id === numericProductId);

    return (
        <div className="product-detail">
            <Link to="/" className="btn btn-light my-3 back-button">
                Go Back
            </Link>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error?.error}
              </Message>
            ) : (
                <>
                    <Row>
                        <Col md={5}>
                            <Image src={product?.image} alt={product?.name} fluid className="product-image" />
                        </Col>

                        <Col md={4}>
                            <ListGroup variant="flush" className="product-info">
                                <ListGroup.Item>
                                    <h3 className="product-title">{product?.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item className="product-price">
                                    Price: <strong>${product?.price}</strong>
                                </ListGroup.Item>
                                <ListGroup.Item className="product-description">
                                    Description: {product?.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card className="product-purchase-card">
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product?.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product?.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control 
                                                        as="select" 
                                                        value={qty} 
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product?.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block add-to-cart-btn"
                                            type="button"
                                            disabled={product?.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
            {/* <Row>
                <Col md={5}>
                    <Image src={product?.image} alt={product?.name} fluid className="product-image" />
                </Col>

                <Col md={4}>
                    <ListGroup variant="flush" className="product-info">
                        <ListGroup.Item>
                            <h3 className="product-title">{product?.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item className="product-price">
                            Price: <strong>${product?.price}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item className="product-description">
                            Description: {product?.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card className="product-purchase-card">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product?.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    className="btn-block add-to-cart-btn"
                                    type="button"
                                    disabled={product?.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row> */}
        </div>
    )
}

export default ProductDetail
