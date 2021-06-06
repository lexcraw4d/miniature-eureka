const express = require('express');
const router = express.Router();
const database = require('../db/db.json');
const path = require('path');

// Rest API CRUD Paradigm
// Get    - R ead   - Gets data from backend
// Post   - C reate - Submit data to the backend (maybe store)
// Put    - U pdate - Modify existing elements in yoru backend
// Delete - D elete - Erase one entity from your backend.

// '/' GET
router.route('/api').get(function (req, res) {
	res.send(`Note Taker API version 0.0.1`);
	// res.render('index', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;