const express = require('express');
const router = express.Router();
const database = require('../db/db.json');
const fs = require('fs');

// let notesId = 2;

router
	.route('/api/notes')
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
	.route('/api/notes/:id')
	// Returns single note by id.
	.get((req, res) => {
		const id = req.params.id;
		const note = database.find((el) => el.id === Number(id));
		if (!note) {
			// Note was not found with that id.
			return res.status(404).send('Entity not found');
		}
		res.send(note);
	})

	// Update single note (by id).
	.put((req, res) => {
		const id = req.params.id;
		const update = req.body;
		const noteIndex = database.map((el) => el.id).indexOf(Number(id));

		if (noteIndex < 0) {
			// Note was not found with that id.
			return res.status(404).send('Entity not found');
		}

		// Update note fields.
		database[noteIndex].title = update.title;
		database[noteIndex].content = update.content;

		fs.writeFileSync('db/db.json', JSON.stringify(database, null, 2));
		res.send(database[noteIndex]);
	})

	// Delete single note (by id).
	.delete((req, res) => {
		const id = req.params.id;
		// Check if db has such id.
		const noteIndex = database.map((el) => el.id).indexOf(Number(id));

		if (noteIndex < 0) {
			// Note was not found with that id.
			return res.status(404).send('Entity not found');
		}

		database.splice(noteIndex, 1);
		fs.writeFileSync('db/db.json', JSON.stringify(database, null, 2));
		res.send('Ok');
	});

module.exports = router;
