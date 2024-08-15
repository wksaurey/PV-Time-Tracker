const express = require('express');
const {readFile, readFileSync} = require('fs').promises;
const app = express();
app.use(express.static('../client'));

const PORT = 3000;
app.listen(PORT, () => {
	  console.log(`Server running at http://localhost:${PORT}/`);
});


// app.get('/', async (request, response) => {

// 	response.send(await readFile('./index.html', 'utf8'));

// });