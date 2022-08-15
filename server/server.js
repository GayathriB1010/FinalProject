const express = require("express");
const app = express();
const port = 8000;
var cors = require("cors");

app.use(cors());
app.use(express.json());
const { getAllProjects, addProject,getRecentProjects} = require("./projectHandler");

const {
  getAllInProgressTasks,
  getAllDoneTasks,
  addTask,
  getAllTodoTasks,
  updateTask,
  deleteTask
} = require("./taskHandler");

const {
  getUserRole,
  getUsers,
  getUser,
  getUserNames,
  getprojectUsers,
} = require("./userHandler");

app.get("/api/all-projects/:user", getAllProjects);
app.get("/api/project/:projectId/todo", getAllTodoTasks);
app.get("/api/project/:projectId/inProgress", getAllInProgressTasks);
app.get("/api/project/:projectId/done", getAllDoneTasks);
app.post("/api/project/:projectId/add-task", addTask);
app.post("/api/project/add-project", addProject);
app.get("/api/get-adminUsers", getUserRole);
app.get("/api/user/", getUser); //e.g. ?email=tom_smith@gmail.com&password=verystrongpassword
app.get("/api/get-users/", getUsers);
app.get("/api/getNames/:email", getUserNames);
app.patch("/api/update-task", updateTask);
app.get("/api/getProjectUsers/:projectId", getprojectUsers);
app.get("/api/get-recentProjects/:user",getRecentProjects)
app.delete("/api/delete-task/:taskId",deleteTask);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
