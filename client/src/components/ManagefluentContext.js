import { createContext, useState } from "react";

export const ManagefluentContext = createContext(null);

export const ManagefluentProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    const [projects,setProjects] = useState([]);
    const [todoTasks,setTodoTasks] = useState([]);
    const [inProgressTasks,setInProgressTasks] = useState([]);
    const [doneTasks,setDoneTasks] = useState([]);
    const [name,setName] = useState(null);
    const [updateTodo,setUpdateTodo] = useState(false);
    const [adminUsers,setAdminUsers] = useState([]);
    const [updateProjects,setUpdateProjects] = useState(false);
    const [taskClicked,setTaskClicked] = useState(false);
    const [createProjectClicked,setCreateProjectClicked] = useState(false);
    const [selectedProjectId,setSelectedProjectId] = useState(null);
    const [recentProjects,setRecentProjects] = useState([]);
    const [projectClicked,setProjectClicked] = useState(false);

return(
    <ManagefluentContext.Provider value={{currentUser,setCurrentUser,projects,setProjects,todoTasks,setTodoTasks,name,setName,updateTodo,setUpdateTodo,adminUsers,setAdminUsers,updateProjects,setUpdateProjects,taskClicked,setTaskClicked,createProjectClicked,setCreateProjectClicked,selectedProjectId,setSelectedProjectId,recentProjects,setRecentProjects,projectClicked,setProjectClicked}}>{children}</ManagefluentContext.Provider>
)
}