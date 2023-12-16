const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// Import the connectToServer function from conn.js
const { connectToServer } = require("./db/conn");

app.listen(port, async () => {
  try {
    // Perform a database connection when the server starts
    const db = await connectToServer();
    console.log("Connected to MongoDB");

    // Here, you can use the 'db' instance for your MongoDB operations

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

  console.log(`Server is running on port: ${port}`);
});
