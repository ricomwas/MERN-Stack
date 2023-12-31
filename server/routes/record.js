const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
  try {
    let db_connect = await dbo.connectToServer();
    let records = await db_connect.collection("records").find({}).toArray();
    res.json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  try {
    let db_connect = await dbo.connectToServer();
    let myquery = { _id: new ObjectId(req.params.id) };
    let result = await db_connect.collection("records").findOne(myquery);
    res.json(result);
  } catch (err) {
    console.error("Error fetching record:", err);
    res.status(500).send("Internal Server Error");
  }
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, response) {
  try {
    let db_connect = await dbo.connectToServer();
    let myobj = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let result = await db_connect.collection("records").insertOne(myobj);
    response.json(result);
  } catch (err) {
    console.error("Error adding record:", err);
    response.status(500).send("Internal Server Error");
  }
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, response) {
  try {
    let db_connect = await dbo.connectToServer();
    let myquery = { _id: new ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    let result = await db_connect.collection("records").updateOne(myquery, newvalues);
    console.log("1 document updated");
    response.json(result);
  } catch (err) {
    console.error("Error updating record:", err);
    response.status(500).send("Internal Server Error");
  }
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, response) => {
  try {
    let db_connect = await dbo.connectToServer();
    let myquery = { _id: new ObjectId(req.params.id) };
    let result = await db_connect.collection("records").deleteOne(myquery);
    console.log("1 document deleted");
    response.json(result);
  } catch (err) {
    console.error("Error deleting record:", err);
    response.status(500).send("Internal Server Error");
  }
});


module.exports = recordRoutes;