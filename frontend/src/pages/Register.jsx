import { useState , useEffect } from "react"
import {Link , useLocation , useNavigate} from "react-router-dom"
import { Form, Button , Row , Col } from "react-bootstrap"
import { useRegisterMutation } from "../slices/usersApiSlice"
import FormComponent from "../components/FormComponent"
import { useDispatch , useSelector } from "react-redux" 
import Loader from "../components/Loader"
import Message from "../components/Message"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register , {isLoading}] = useRegisterMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    } , [navigate , userInfo , redirect])

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            toast.error('Passwords do not match') 
        } else {
            try {
                const res = await register({name , email , password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error?.error)
            }
        } 
    }
  return (
    <FormComponent>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email' 
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mt-2" disabled={isLoading}>
                Register
            </Button>

            {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
            <Col>
                Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
        </Row>
    </FormComponent>
  )
}

export default Register