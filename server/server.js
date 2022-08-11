const express = require('express')
const app = express()
const port = 8000
var cors = require('cors')

app.use(cors())
app.use(express.json());
const {
  getAllProjects,
  getAllTodoTasks,
  getAllInProgressTasks,
  getAllDoneTasks,
  addTask,
  addProject,
  getUserRole,
  getUser
} = require("./projectHandler");

app.get("/api/all-projects/:user",getAllProjects);
app.get("/api/project/:projectId/todo",getAllTodoTasks);
app.get("/api/project/:projectId/inProgress",getAllInProgressTasks);
app.get("/api/project/:projectId/done",getAllDoneTasks);
app.post("/api/project/:projectId/add-task",addTask);
app.post("/api/project/add-project",addProject);
app.get("/api/get-adminUsers",getUserRole);
app.get("/api/user/", getUser) //e.g. ?email=tom_smith@gmail.com&password=verystrongpassword

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
