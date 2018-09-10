const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true // Add 2 fields (createdAT and updateAt) to the schema.
});

module.exports = mongoose.model("Note", NoteSchema);