import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import "../custom-css/cart.css"

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <Row className="cart-page">
            <Col md={8}>
                <h1 className="mb-4">Shopping Cart <FaShoppingCart /></h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((cartItem) => (
                            <ListGroup.Item key={cartItem._id} className="cart-item">
                                <Row>
                                    <Col md={2}>
                                        <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${cartItem._id}`} className="product-link">
                                            {cartItem.name}
                                        </Link>
                                    </Col>
                                    <Col md={2} className="price">
                                        ${cartItem.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={cartItem.qty}
                                            onChange={(e) => addToCartHandler(cartItem, Number(e.target.value))}
                                            className="quantity-select"
                                        >
                                            {[...Array(cartItem?.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button 
                                            type="button" 
                                            variant="danger"
                                            className="remove-btn"
                                            onClick={() => removeFromCartHandler(cartItem._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card className="summary-card">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items
                            </h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block proceed-btn"
                                disabled={cartItems.length === 0}
                                onClick={checkOutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default Cart;
