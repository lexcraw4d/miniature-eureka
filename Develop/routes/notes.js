const express = require('express');
const router = express.Router();
const database = require('../db/db.json');
const fs = require('fs');

// let notesId = 2;

router
	.route('/notes')
	// Returns all notes
	.get((req, res) => {
		res.send(database);
	})
	// Creates new note
	.post((req, res) => {
		const newNote = req.body;

		if (!newNote) {
			res.send('Incorrect body');
			return;
		}

		const nextId = database.length;
		newNote.id = nextId;
		database.push(newNote);
		fs.writeFileSync('db/db.json', JSON.stringify(database, null, 2));
		res.send('Ok');
	});

router
	.route('/notes/:id')
	.get((req, res) => {
		const id = req.params.id;
		const note = database.find((el) => el.id === Number(id));
		res.send(note);
	})
	.put((req, res) => {
		const id = req.params.id;
		const update = req.body;
		const noteIndex = database.map((el) => el.id).indexOf(Number(id));

		if (noteIndex < 0) {
			return res.send('Entity not found');
		}

		database[noteIndex].title = update.title;
		database[noteIndex].content = update.content;
		fs.writeFileSync('db/db.json', JSON.stringify(database, null, 2));
		res.send(database[noteIndex]);
	});

module.exports = router;
