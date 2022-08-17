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

//returns list of all tasks with status todo of the specific project

const getAllTodoTasks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const projectId = req.params.projectId;
    const result = await db
      .collection("tasks")
      .find({ projectId: projectId, status: "todo" })
      .toArray();
    if (result) {
      console.log(result)
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

//returns list of all tasks with status in progress of the specific project

const getAllInProgressTasks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const projectId = req.params.projectId;
    const result = await db
      .collection("tasks")
      .find({ projectId: projectId, status: "inProgress" })
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

//returns list of all tasks with status done of the specific project

const getAllDoneTasks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FinalProject");
    const projectId = req.params.projectId;
    const result = await db
      .collection("tasks")
      .find({ projectId: projectId, status: "done" })
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

const addTask = async (req, res) => {
  //creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    //connect to the database
    const db = client.db("FinalProject");
    const { name } = req.body;
    const projectId = req.params.projectId;
    const result = await db
      .collection("tasks")
      .insertOne({
        taskId: uuidv4(),
        projectId: projectId,
        status: "todo",
        description: "",
        name: name,
        assignedTo: [],
        documents:""
      });
    if (result.acknowledged) {
      res
        .status(201)
        .json({ status: 201, message: "Task added", data: req.body });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

// updates an existing task
const updateTask = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  try {
    await client.connect();
    // connect to the database 
    const db = client.db("FinalProject");
    const { description, assignedTo, taskId,documents } = req.body;
    const result = await db.collection("tasks").findOne({ taskId:taskId});
    if (result) {
      const result1 = await db
        .collection("tasks")
        .updateOne(
          { taskId: taskId },
          { $set: { description: 
            description, assignedTo: assignedTo,documents:documents } },
          { multi: true }
        );
      if (result1.modifiedCount > 0) {
        res.status(200).json({ status: 200, message: "data modified" });
      } else {
        res.status(404).json({ status: 404, message: "data not modified" });
      }
    }
  } catch (err) {
    console.log(err.stack);
  }finally{
    client.close();
  }
};

// updates status of an existing task
const updateStatus = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);
  // connect to the client
  try {
    await client.connect();
    // connect to the database 
    const db = client.db("FinalProject");
    const { status } = req.body;
    const taskId = req.params.taskId;
    const result = await db.collection("tasks").findOne({ taskId:taskId});
    if (result) {
      const result1 = await db
        .collection("tasks")
        .updateOne(
          { taskId: taskId },
          { $set: { status: 
            status, } }
        );
      if (result1.modifiedCount > 0) {
        res.status(200).json({ status: 200, message: "data modified" });
      } else {
        res.status(404).json({ status: 404, message: "data not modified" });
      }
    }
  } catch (err) {
    console.log(err.stack);
  }finally{
    client.close();
  }
};

//deletes a task
const deleteTask = async (req,res) =>{
  const client = new MongoClient(MONGO_URI,options);
  try{
    await client.connect();
    //connect to the database
    const db = client.db("FinalProject");
    const taskId = req.params.taskId;
    console.log(taskId)
    const result = await db.collection("tasks").deleteOne({taskId:taskId});
    console.log(result)
    result?
    res.status(204).json({status:204, message:"data deleted"}):
    res.status(404).json({status:404,message:"data not deleted"});
  }catch(err){
    console.log(err.stack);
  }finally{
    client.close();
  }
}

module.exports = {
  getAllTodoTasks,
  getAllInProgressTasks,
  getAllDoneTasks,
  addTask,
  updateTask,
  deleteTask,
  updateStatus
};
