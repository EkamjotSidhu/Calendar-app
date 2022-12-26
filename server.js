const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const fs = require("fs")
const uuid = require('uuid')
const PORT = 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'));

});

app.post('/api/notes', (req, res) => {
    var obj = { id: uuid.v4(), title: req.body.title, text: req.body.text }
    var readData = (fs.readFileSync("db/db.json", "utf-8"))
    readData = JSON.parse(readData)
    readData.push(obj)
    fs.writeFile("./db/db.json", JSON.stringify(readData), (err) => {
        if (err) {
            throw (err)
        };
        res.json(readData)
    })
})
app.delete('/api/notes/:id', (req, res) => {
    var noteData = fs.readFileSync("db/db.json", "utf-8")
    noteData = JSON.parse(noteData)
    var id = req.params.id
    var newData = noteData.filter((ele) => {
        return (ele.id != id)
    })

    fs.writeFileSync("db/db.json", JSON.stringify(newData), (err) => {
        if (err) {
            throw (err)
        };
        res.json(newData)
    })
})







app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
