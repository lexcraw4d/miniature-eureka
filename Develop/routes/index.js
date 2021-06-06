const express = require('express');
const router = express.Router();
const database = require('../db/db.json');
const path = require('path')

// Rest API CRUD Paradigm
// Get    - R ead   - Gets data from backend
// Post   - C reate - Submit data to the backend (maybe store)
// Put    - U pdate - Modify existing elements in yoru backend
// Delete - D elete - Erase one entity from your backend.

// '/' GET
router.route('/').get(function (req, res) {
	res.send(`Note Taker API version 0.0.1`);
});

//links html static
router.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});
module.exports = router;
