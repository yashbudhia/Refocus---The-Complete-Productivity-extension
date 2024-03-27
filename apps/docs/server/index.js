const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Object to store tab data
let tabData = {};

// Endpoint to receive tab data
app.post("/tab-data", (req, res) => {
  tabData = req.body;
  console.log("Received tab data:", tabData);
  res.status(200).send("Tab data received successfully");
});

// Endpoint to retrieve tab data
app.get("/tab-data", (req, res) => {
  res.status(200).json(tabData);
});

// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
