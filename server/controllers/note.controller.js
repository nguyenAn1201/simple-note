const Note = require('../models/model');

// Create and save note
exports.createNote = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note cannot be empty!"
        });
    }

    // Create note
    const note = new Note({
        title: req.body.title || "untitled",
        content: req.body.content
    });

    // Save note to the database
    note.save()
     .then(data => {
         res.send(data);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Error while creating note!"
         });
     });
};

//Retrieve all notes
exports.findAllNotes = (req, res) => {
    Note.find()
     .then(notes => {
         res.send(notes);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Error trying to retrieve all notes!"
         });
     });
};

// Find note based on noteId
exports.findNote = (req, res) => {
    Note.findById(req.params.noteId)
     .then(note => {
         if (!note) {
             return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found"
            });
         }
         res.send(note);
     }).catch(err => {
         return res.status(500).send({
             message: "Error finding note with id " + req.params.noteId
         });
     });
};

// Update note
exports.updateNote = (req, res) => {
    // Validate request, check for empty note
    if (!req.body.content) {
        return res.status(400).send({
            message: "note cannot be empty"
        });
    }

    // Find note based on noteId and update it 
    Note.findByIdAndUpdate(req.params.noteId, {
        // title: req.body.title || "Untitled", // Currently doesn't allow title editting
        content: req.body.content
    }, {new: true}) //this return the modified doc to the then() func instead of old one
     .then(note => {
         if (!note) {
             return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found"
            });
         }
         res.send(note); // return note
     }).catch(err => {
         if (err.kind === 'ObjectId') {
             return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found"
            });
         }
         // if the id is correct but has another error
         return res.status(500).send({
             message: "Error updating note with id " + req.params.noteId
         });
     });
};

// Delete note based on noteId
exports.deleteNote = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
     .then(note => {
         if (!note) {
             return res.status(404).send({
                message: "Note with id " + req.params.noteId + " not found"
            });
         }
         res.send({ message: "Note with id " + req.params.noteId + " successfully deleted!"});
     }).catch(err => {
         // ID validation
         if (err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "Note with id " + req.params.noteId + " not found"
             });
         }
         return res.status(500).send({
             message: "Failed to delete note with id: " + req.params.noteId 
         });
     });
};