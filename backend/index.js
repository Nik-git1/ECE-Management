const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors'); // Import the cors module

connectToMongo();
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://127.0.0.1:5173' 
}));

app.use('/api/equipment/', require('./routes/equipment'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
