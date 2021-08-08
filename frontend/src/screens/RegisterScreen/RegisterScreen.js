import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const history = useHistory()
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister
    
    useEffect(()=>{
      if(userInfo) {
        history.push('/mynotes')
      }
    },[history, userInfo])

  const submitHandler =async(e)=>{
    e.preventDefault()

    if(password !== confirmpassword) {
      setMessage('Password does not match')
    } else{
      dispatch(register(name, email, password, pic))
    }
   
  }
const API='https://api.cloudinary.com/v1_1/dbecommerce/image/upload'
 
const postDetails =(pics)=>{
    if(!pics) {
      return setPicMessage('Please select an image')
    }
    setPicMessage(null)

    if(pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset','reduxDB')
      data.append('cloud_name','dbecommerce')
      fetch(API, {
        method:'post',
        body:data,

      }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        setPic(data.url.toString())
      })

    } else{
      return setPicMessage('Please Select JPEG or PNG')
    }
}
  

  return (
    <MainScreen title='REGISTER' >
        <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            type="text" 
            placeholder="Enter Name" />
           
          </Form.Group>
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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {
            picMessage && (
              <ErrorMessage variant='danger'> {picMessage} </ErrorMessage> 
            )
          }

          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>
          
          <Button className='mt-3' variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
          Have an Account ? <Link to='/register'>Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default RegisterScreen
