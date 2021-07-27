import { Button, Container, Row } from 'react-bootstrap'
import './LandingPage.css'
const LandingPage = () => {
  return (
    <div className='main'>
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className='title'>Welcome To MERN Redux Strater</h1>
              <p className='subtitle'>From here we start our Main Journey</p>
            <div className="buttonContainer">
              <a href="/login">
                <Button size='lg' className='landingbutton' >
                  Login
                </Button >
              </a>
              <a href="/register">
                <Button size='lg'
                variant='outline-primary'
                 className='landingbutton'>
                  Sign Up
                </Button>
              </a>
            </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
