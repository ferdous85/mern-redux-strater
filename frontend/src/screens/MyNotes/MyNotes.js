import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { Accordion, Button, Card } from 'react-bootstrap'
import notes from '../../components/data/notes'

const MyNotes = () => {

  const deleteHandler = ()=>{
    if(window.confirm('Are you sure?')) {
       
    }
  }

  return (
    <MainScreen title='Welcome John Doe ...' >
      <Link to='/createnote'>
        <Button>
          Create New Note
        </Button>
        </Link>
        {notes.map(note=>(
          <Accordion>
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
        Created On - Date
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
