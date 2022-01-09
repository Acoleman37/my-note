const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

const notes = require('./db/db');

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return newNote;
}

app.get('api/notes', (req, res) => {
    res.json(notes);
});

app.post('api/notes', (req, res) => {
    req.body.id = allNotes.length.toString();

    const newNote = createNewNote(req.body, notes);
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});