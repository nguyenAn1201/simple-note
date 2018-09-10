import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Button } from 'react-bootstrap';

function Note(props) {
  return (
    <div className="note">
      <div className="title-container"><h4>{props.title} {props.index}</h4></div>
      <p>{props.content}</p>
      <Button bsStyle="danger" onClick={props.delNote}>Delete</Button>
      <Button bsStyle="primary">Edit</Button>
    </div>
  )
}

function EditNote(props) {
  return (
    <div className="note">
      <div className="title-container"><h4>{props.title} {props.index}</h4></div>
      <textarea className="textarea" name="content" defaultValue={props.content} />
      <Button bsStyle="danger" onClick={props.delNote}>Cancel</Button>
      <Button bsStyle="primary">Done</Button>
    </div>
  )
}

function RenderSelection(props) {
  const editClicked = props.editClicked;
  if (editClicked) {
    return <EditNote title={props.title} />
  } else {
    return <Note title={props.title} content={props.content} delNote={props.delNote}/>
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      notes: [],
      id: null,
      title: "",
      content: "",
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }
  handleContentChange = (event) => {
    this.setState({ content: event.target.value});
  }
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }
  
  // Request POST with new title and content. 
  handleSubmit = (event) => {
    console.log('Note title: ' + this.state.title + '\nNote content: ' + this.state.content);
    axios.post('http://localhost:3000/notes', {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content
    })
     .then(res => console.log(res))
     .catch(err => console.log(err));
  }
  
  // Get the data when components is rendered
  componentDidMount() {
    axios.get('http://localhost:3000/notes')
    .then(json => json.data.map(result => ( //Parsing into another array 
      {
        id: result._id,
        title: result.title,
        content: result.content
      })))
    .then(newData => this.setState({ notes: newData })) // Asssint new data.
    .catch( err => console.log(err))
  }

  // Request DELETE when delete button is clicked, also rerender components when clicked 
  deleteNote = (index, noteId) => {
    axios.delete('http://localhost:3000/notes/'+ noteId)
     .then(res => {
       console.log(res);
     })
     .catch(err => {
       console.log(err);
     })
    const tempNoteArray = Object.assign([], this.state.notes);  // Creating a duplicate of notes[] insteand of referencing notes[] 
    tempNoteArray.splice(index, 1);
    this.setState({ notes: tempNoteArray });
    console.log("Array after deletion: " + this.state.notes);
  }

  // Request PUT when edit button is clicked, rerender component with editted data. 
  editNote = (index, noteId) => {
    axios.put('http://localhost:3000/notes/' + noteId)
     .then(res => {
       console.log(res);
     })
     .catch(err => {
       console.log(err);
     })
  }

  render() {
    return (
      <div className="App">
       <Navbar>
        <h1>Simple Note</h1>
       </Navbar>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title </label> 
            <p> 
              <input className="title" type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
            </p>
            <div>
              <label>Content</label>
            </div>
            <textarea className="textarea" name="content" value={this.state.content} onChange={this.handleContentChange} />
          </div>
          <Button bsStyle="primary" type="submit" > Submit </Button>
        </form>
       
        {/* Getting the notes */}
        <div className="note-container">
          {this.state.notes.map((output, index) => (
          <RenderSelection key={index} editClicked={false} index={index} id={output.id} title={output.title} content={output.content} delNote={this.deleteNote.bind(this, index, output.id)} />
          //<Note key={index} index={index} id={output.id} title={output.title} content={output.content} delNote={this.deleteNote.bind(this, index, output.id)}/>
          //<EditNote key={index} index={index} id={output.id} title={output.title} content={output.content} onChange={this.handleContentChange}/>
          ))}

        </div>
      </div>
    );
  }
}

export default App;
