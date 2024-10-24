import { useState , useEffect } from "react"
import {Link , useLocation , useNavigate} from "react-router-dom"
import { Form, Button , Row , Col } from "react-bootstrap"
import { useLoginMutation } from "../slices/usersApiSlice"
import FormComponent from "../components/FormComponent"
import { useDispatch , useSelector } from "react-redux" 
import Loader from "../components/Loader"
import Message from "../components/Message"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login , {isLoading}] = useLoginMutation()

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
        try {
            const res = await login({email , password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error?.error)
        }
    }
  return (
    <FormComponent>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
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

            <Button type='submit' variant='primary' className="mt-2" disabled={isLoading}>
                Sign In
            </Button>

            {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
            </Col>
        </Row>
    </FormComponent>
  )
}

export default Login