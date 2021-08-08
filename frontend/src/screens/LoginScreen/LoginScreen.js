import {  useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { login } from "../../actions/userActions"
import ErrorMessage from "../../components/ErrorMessage"
import Loading from "../../components/Loading"
import MainScreen from "../../components/MainScreen"
import './LoginScreen.css'

const LoginScreen = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) =>state.userLogin)
  const {loading, error, userInfo} = userLogin

  useEffect(()=>{
    if(userInfo) {
      history.push('/mynotes')
    }
  },[history, userInfo])

  const submitHandler = async(e) =>{
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <MainScreen title='LOGIN'>
      <div className="loginContainer">
        {error && <ErrorMessage variant='danger'> {error} </ErrorMessage>}
       {loading && <Loading/>} 
      <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email" 
            placeholder="Enter email" />
           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password" 
            placeholder="Password" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
          New Visitor ? <Link to='/register'>Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default LoginScreen
