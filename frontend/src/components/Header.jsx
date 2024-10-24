import React from 'react'
import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart , FaUser} from 'react-icons/fa'
import "../custom-css/header.css"
import logo from "../assets/logo.png"
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice'
import {logout} from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'

const Header = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <header>
        <Navbar className='custom-navbar' variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt="ProShop" className="logo"/>
                        ProShop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link href="/cart">
                                <FaShoppingCart/> Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg="success" style={{marginLeft: "5px"}}>
                                        {cartItems.reduce((acc , item) => acc + Number(item.qty) , 0)}
                                    </Badge>
                                )}

                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link href="/login">
                                    <FaUser/> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>       
        </Navbar>
    </header>
  )
}

export default Header