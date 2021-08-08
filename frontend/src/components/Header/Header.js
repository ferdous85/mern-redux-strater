import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

const Header = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  
  const userLogin = useSelector(state => state.userLogin)
 

  const logoutHandler =()=>{
    dispatch(logout())
    history.push('/')
  }

  return (
    <Navbar bg="primary" expand="lg" variant='dark' >
      <Container>
      <Navbar.Brand >
        <Link to='/'className='link'>
        Redux-Strater
        </Link>
        </Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">

    <Nav className='m-auto' >
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
     
    </Form>
    </Nav>

    <Nav
      className="my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link> <Link className='link' to='/mynotes' >My Notes</Link> 

      </Nav.Link>
      
      <NavDropdown title="John Doe" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action4">My Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5"
          onClick={
            logoutHandler
          }
        >Logout</NavDropdown.Item>
      </NavDropdown>
     
    </Nav>
    
  </Navbar.Collapse>
      </Container>
</Navbar>
  )
}

export default Header
