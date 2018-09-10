module.exports = (app) => {
    const notes = require("../controllers/note.controller");

    // Create a new note
    app.post('/notes', notes.createNote);

    // Get all notes
    app.get('/notes', notes.findAllNotes);

    // Get note based on noteID
    app.get('/notes/:noteId', notes.findNote);

    // Edit note with noteId
    app.put('/notes/:noteId', notes.updateNote);

    // Delete note with noteId
    app.delete('/notes/:noteId', notes.deleteNote);
}