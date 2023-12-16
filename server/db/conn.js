const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

// Export a function that returns the connected database instance
async function connectToServer() {
  const client = new MongoClient(Db, {
   /*  useNewUrlParser: true,
    useUnifiedTopology: true, */
  });

  try {
    await client.connect();
    return client.db("employees"); // Return the connected database instance
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    throw err; // Throw the error to be caught by the caller
  }
}

module.exports = { connectToServer };
