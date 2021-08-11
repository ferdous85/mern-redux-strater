import MainScreen from '../../components/MainScreen'
import { Link, useHistory } from 'react-router-dom'
import { Accordion, Button, Card } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listNotes, deleteNoteAction } from '../../actions/notesActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

const MyNotes = () => {

const history = useHistory()

const dispatch = useDispatch()
const noteList = useSelector(state => state.noteList)
const {loading, notes, error} = noteList

const userLogin = useSelector(state => state.userLogin)
const userInfo = userLogin

const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success:successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;


const deleteHandler = (id)=>{
    if(window.confirm('Are you sure?')) {
       dispatch(deleteNoteAction(id))
    }
  }

console.log(notes);

  useEffect(()=>{
    dispatch(listNotes())
    if(!userInfo) {
      history.push('/')
    }
  }, [dispatch, successCreate, history, userInfo, successUpdate, successDelete])

  return (
    <MainScreen title={`Welcome ${userInfo && userInfo.name}`} >
      <Link to='/createnote'>
        <Button>
          Create New Note
        </Button>
        </Link>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes?.reverse().map(note=>(
          <Accordion key={note._id}>
           <Card style={{margin:10}}>
           <Card.Header style={{display:'flex'}} >
             <span 
               style={{
                 color:'black',
                 textDecoration:'none',
                 flex:1,
                 cursor:'pointer',
                 alignSelf:'center',
                 fontSize:18
               }}
             >
               <Accordion.Toggle as={Card.Text} varient='link' eventKey='0'>
               {note.title}  
               </Accordion.Toggle>
               </span>
             <div>
              <Button href={`/note/${note._id}`} >Edit</Button>
               <Button onClick={()=>deleteHandler(note._id)} variant='danger' className='mx-2'>Delete</Button>
             </div>
           </Card.Header>
           <Accordion.Collapse eventKey='0'>

           <Card.Body>
             <h4>
             <Button variant='success'>
             Category - {note.category}
             </Button>
             </h4>
           <blockquote className="blockquote mb-0">
      <p>
        {note.content}
      </p>
      <footer className="blockquote-footer">
        Created On {' '}
        {note.createdAt.substring(0, 10)}

      </footer>
    </blockquote>
           </Card.Body>
           </Accordion.Collapse>
         </Card>
          </Accordion>
        ))
        }
        
      
    </MainScreen>
  )
}

export default MyNotes
