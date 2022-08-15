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

// const get admin users

const getUserRole = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const result = await db
      .collection("users")
      .find({ role: "admin" })
      .toArray();
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, message: "admin users not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

//get all users
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const result = await db.collection("users").find().toArray();
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, message: "users not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

//get user details to get FirstName, lastName
const getUserNames = async (req, res) => {
  const user = req.query.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const result = await db.collection("users").findOne({ user });
    if (result) {
      res.status(200).json({ status: 200, data: result });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
//get users for the specific project
const getprojectUsers = async (req, res) => {
  const projectId = (req.params.projectId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const result = await db
      .collection("projects")
      .find({ projectId: projectId })
      .toArray();
    if (result) {
      res.status(200).json({ status: 200, data: result });
    } else {
      res.status(404).json({ status: 404, message: "project not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

// get user for sign in

const getUser = async (req, res) => {
  const user = url.parse(req.url, true).query;

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const result = await db.collection("users").findOne({ email: user.email });
    if (result) {
      if (user.password === result.password) {
        res.status(200).json({ status: 200, data: result });
      } else {
        res
          .status(400)
          .json({ status: 400, message: "Password does not match" });
      }
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getUserRole,
  getUser,
  getUsers,
  getUserNames,
  getprojectUsers,
};
