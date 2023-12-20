const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors"); // Import the cors module
const path = require('path');

connectToMongo();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, './dist')));

app.use(cors({
  origin: '*' 
  
}));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/transaction", require("./routes/transaction"));
app.use("/api/equipment/", require("./routes/equipment"));
app.use("/api/transaction/", require("./routes/transaction"));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, './dist/index.html');
  res.sendFile(indexPath);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
