const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new sqlite3.Database('data.db');

// Create a simple table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (content TEXT)');
});

app.post('/submit', (req, res) => {
  const content = req.body.content;

  // Insert data into the database
  db.run('INSERT INTO messages (content) VALUES (?)', [content], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.status(200).send('Data submitted successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
