const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require ('path')



// App Routes
const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(indexRouter);

app.use(notesRouter);

app.listen(PORT, (req, res) => {
	console.log(`Express App listening on ${PORT}: http://localhost:${PORT}`);
});
