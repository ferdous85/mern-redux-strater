import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import ErrorMessage from '../../components/ErrorMessage'
import axios from 'axios'
import Loading from '../../components/Loading'

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
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  const submitHandler =async(e)=>{
    e.preventDefault()
    if (password !== confirmpassword) {
      setMessage('Password Do not Match')
    } else {
      setMessage(null)
      try {
        const config = {
          headers: { 
            "Content-type":"application/json"
          }
        }
        setLoading(true)
        const {data} = await axios.post('/api/users',{
        name, email,pic, password
        }, config)

        console.log(data);
        setLoading(false)

        localStorage.setItem('userInfo', JSON.stringify(data))

      } catch (error) {
        setError(error.response.data.message)
      }
    }
  }

  const postDetails =()=>{

}
  

  return (
    <MainScreen title='REGISTER' >
        <div className="loginContainer">
        {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
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
