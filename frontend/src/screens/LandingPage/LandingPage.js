import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './LandingPage.css'
const LandingPage = () => {

  // useEffect(()=>{
  //   const userInfo = localStorage.getItem('userInfo')

  //   if(userInfo){
  //     history.pushState('/mynotes')
  //   }

  // },[history])

  return (
    <div className='main'>
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className='title'>Welcome To MERN Redux Strater</h1>
              <p className='subtitle'>From here we start our Main Journey</p>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size='lg' className='landingbutton' >
                  Login
                </Button >
              </Link>
              <Link to="/register">
                <Button size='lg'
                variant='outline-primary'
                 className='landingbutton'>
                  Sign Up
                </Button>
              </Link>
            </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
