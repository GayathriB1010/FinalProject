const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const url = require("url");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//returns list of all projects which the user is part of

const getAllProjects = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const user = req.params.user;
    const result = await db
      .collection("projects")
      .find({ userId: user })
      .toArray();
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, message: "Projects not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

//add task to todo

const addProject = async (req, res) => {
  //creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    //connect to the database
    const db = client.db("FinalProject");
    const { projectName, projectDescription, createdBy, userId } = req.body;
    const result = await db
      .collection("projects")
      .insertOne({
        projectId: uuidv4(),
        projectName: projectName,
        projectDescription: projectDescription,
        createdBy: createdBy,
        userId: userId,
      });
    if (result.acknowledged) {
      res
        .status(201)
        .json({ status: 201, message: "project added", data: req.body });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getAllProjects,
  addProject,
};
