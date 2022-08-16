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
    const [defaultValuesPreviouslySelected, setDefaultValuesPreviouslySelected] = useState([]);
    const [updateTaskFeed,setupdateTaskFeed] = useState(false);
    //To set the task selected and pass it on to the task modal
    const [taskSelected,setTaskSelected] = useState(null);

return(
    <ManagefluentContext.Provider value={{currentUser,setCurrentUser,projects,setProjects,todoTasks,setTodoTasks,name,setName,updateTodo,setUpdateTodo,adminUsers,setAdminUsers,updateProjects,setUpdateProjects,taskClicked,setTaskClicked,createProjectClicked,setCreateProjectClicked,selectedProjectId,setSelectedProjectId,recentProjects,setRecentProjects,projectClicked,setProjectClicked,defaultValuesPreviouslySelected, setDefaultValuesPreviouslySelected,updateTaskFeed,setupdateTaskFeed,inProgressTasks,setInProgressTasks,doneTasks,setDoneTasks,taskSelected,setTaskSelected}}>{children}</ManagefluentContext.Provider>
)
}