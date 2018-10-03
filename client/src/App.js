import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Button } from 'react-bootstrap';
/*
  function Note(props) {
  return (
    <div className="note">
      <div className="title-container"><h4>{props.title}</h4></div>
      <p>{props.content}</p>
      <Button bsStyle="danger" onClick={props.delNote}>Delete</Button>
      <Button bsStyle="primary" onClick={props.renderEdit}>Edit</Button>
    </div>
  )
}

function EditNote(props) {
  return (
    <div className="note">
      <div className="title-container"><h4>{props.title} {props.index}</h4></div>
      <textarea className="textarea" name="content" value={props.content} onChange={props.handleContentChange} />
      <Button bsStyle="danger" onClick={props.cancelEdit}>Cancel</Button>
      <Button bsStyle="primary" >Done</Button>
    </div>
  )
}
*/

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      notes: [],
      id: null,
      title: "",
      content: "",
      toEdit: null
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }
  handleContentChange = (event) => {
    this.setState({ content: event.target.value});
  }
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  // Request POST with new title and content. 
  handleSubmit = (event) => {
    event.preventDefault();
    var tempArr = Object.assign([], this.state.notes);
    axios.post('http://localhost:3000/notes', {
      title: this.state.title,
      content: this.state.content
    })
     .then(res => {
       // for id, have to wait for request to be done to have MongoDB assign the id. Then set id state to the response's data
       var object = {id: res.data._id, title: this.state.title,content: this.state.content};
       tempArr.push(object);
       this.setState({ notes: tempArr })
       console.log(res)
     })
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
      const tempNoteArray = Object.assign([], this.state.notes);  // Creating a duplicate of notes[] insteand of referencing notes[] 
      tempNoteArray.splice(index, 1);
      this.setState({ notes: tempNoteArray }, () => {console.log("Array after deletion: " + Object.assign([], this.state.notes))});
       console.log(res);
     })
     .catch(err => {
       console.log(err);
     })
  }

  edit = (index) => {
    this.setState({ toEdit: index })
  }

  // Handle new content edit
  handleEditSubmit = (index, noteId) => {
    var tempArr = Object.assign([], this.state.notes);
    axios.put('http://localhost:3000/notes/' + noteId, 
    {
      content: this.state.content
    })
     .then(res => {
      tempArr[index].content = this.state.content
      this.setState({
       notes: tempArr,
       toEdit: null // Rerender the editNote into a normal note.
      }) 
      console.log(res);
    })
     .catch(err => {
       console.log(err);
       this.setState({ toEdit: null })
     })
  }

  handleCancel = () => {
    this.setState({ toEdit: null })
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
              <input 
                className="title" 
                type="text" 
                name="title" 
                value={this.state.title} 
                onChange={this.handleTitleChange}
              />
            </p>
            <div>
              <label>Content</label>
            </div>
            <textarea 
              className="textarea" 
              name="content" 
              //value={this.state.content} 
              onChange={this.handleContentChange} 
            />
          </div>
          <Button bsStyle="primary" type="submit"> Submit </Button>
        </form>
       
        {/* Getting the notes */}
        <div className="note-container">  
          {this.state.notes.map((output, index) => {
            if (this.state.toEdit === index) {
              return (
                <div key={index} className="note">
                  <div className="title-container"><h4>{output.title}</h4></div>
                    <textarea 
                      className="textarea"
                      type="text" 
                      name="edit-content" 
                      defaultValue={output.content} 
                      onChange={this.handleContentChange} 
                    />
                    <Button bsStyle="danger" type="button" onClick={this.handleCancel} >Cancel</Button>
                    <Button bsStyle="primary" type="button" onClick={this.handleEditSubmit.bind(this, index, output.id)} >Done</Button>
                </div>
              )
            } else {
              return (
                <div key={index} className="note">
                  <div className="title-container"><h4>{output.title}</h4></div>
                    <p>{output.content}</p>
                    <Button bsStyle="danger" onClick={this.deleteNote.bind(this, index, output.id)}>Delete</Button>
                    <Button bsStyle="primary" onClick={this.edit.bind(this, index)} >Edit</Button>
                </div>
              )
            }
          })};
        </div>
      </div>
    );
  }
}

export default App;