import React from 'react'
import { useContext, useEffect,useState } from "react"
import LoadingWheel from "./LoadingScreen";
import { ManagefluentContext } from "./ManagefluentContext";
import TaskModal from "./TaskModal";
import {FiTrash2, FiEdit} from "react-icons/fi";
import {FiRepeat} from "react-icons/fi";
import TaskUpdateModal from "./TaskUpdateModal"
import InprogressComponent from './InprogressComponent';
import DoneTasks from './DoneTasks';

import {
    Assignee,Assignees,TaskUpdateButtons,ButtonDiv,GoogleDocUrl,StyledLink
} from "./TaskboardCommonStyledComponents"

import {Todo,InProgress,Done,NewTask,Head,AddTask,TaskName,TodoTask} from "./TaskBoardStyledcomponent"

//This is the main component of task board where all the todo, inprogress and done tasks are displayed
export default function TaskBoards() {
    const {todoTasks,setTodoTasks,selectedProjectId,name,setName,updateTodo,setUpdateTodo,taskClicked,setTaskClicked, defaultValuesPreviouslySelected, setDefaultValuesPreviouslySelected,updateTaskFeed,setupdateTaskFeed,taskSelected,setTaskSelected} = useContext(ManagefluentContext);
    const [isOpen,setIsOpen] = useState(false);
    
    //state to set open for the taskupdateModal
    const [taskUpdateIsopen,setTaskUpdateisOpen] = useState(false);
    const [ usersDropdownList, setUsersDropdownList ] = useState([]);

    //This use effect will get all the todo tasks when updateTodo changes
    //updateTodo will change when a new todo has been added, edited, deleted or the status has been changed
    useEffect(() =>{
        const getAllTodoTasks = async() =>{
            const response = await fetch(`/api/project/${selectedProjectId}/todo`);
            const data = await response.json();
            setTodoTasks(data.data)
        }
        if(localStorage.getItem("user")){
            getAllTodoTasks();
        }
    },[updateTodo,updateTaskFeed]);

    //This method is to set name of the task when its created
    const newTask = (e) =>{
        setName(e.target.value);
    }

    //This method is to add the task when add task button is clicked
    const addnewTask = (e) =>{
        if(name !== null){
        fetch(`/api/project/${selectedProjectId}/add-task`,{
            method : "POST",
            body : JSON.stringify({
                name : name,
            }),
            headers:{
                "Content-type" :"application/json",
            },
        })
        .then((res) => res.json())
        .then((data) =>{
            setUpdateTodo(!updateTodo);
        })
    }
    }

    //This function will get invoked when a task is clicked
    const taskClickFn = (todoTask) =>{
        setTaskClicked(!taskClicked)
        setTaskSelected(todoTask)
        setIsOpen(true)
    }

    // useEffect(() =>{
    //     if(taskSelected !=null){
    //     setIsOpen(true)
    //     }
    // },[taskSelected])

    //This function will set the taskupdate modal to be true
    const taskUpdateFn = (todoTask) =>{ 
        setTaskSelected(todoTask)
        setTaskUpdateisOpen(true)
        setupdateTaskFeed(updateTaskFeed)
        }


    //This function will get invoked when a delete task button is clicked
    const taskDeleteFn = (todoTask ) =>{
        let taskId = todoTask.taskId;
        fetch(`/api/delete-task/${taskId}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
              },
          }).then((res) =>
          //When the task is deleted, updateTodo will be set to !updateTodo
            setUpdateTodo(!updateTodo))
            }

  return (
      <>
    <Todo>
    <Head>To do</Head>
        <NewTask>
        <TaskName onChange={(e) => newTask(e)}></TaskName>
        <AddTask type="button" onClick={(e) => addnewTask(e)}>Add task</AddTask>
        </NewTask>
        {todoTasks!==[] ? todoTasks.map((todoTask) =>{
            return <TodoTask>{todoTask.name}{todoTask.assignedTo.map((assignee) =>{
                return <Assignees>
                <Assignee>
                {assignee.split("@")[0]}
                </Assignee></Assignees>

            })}
            {todoTask.documents?<><GoogleDocUrl><StyledLink href={todoTask.documents}>Click here to open the Attachment</StyledLink></GoogleDocUrl></>:null}
            <TaskUpdateButtons>
                <ButtonDiv><FiEdit onClick={() => taskClickFn(todoTask)}></FiEdit></ButtonDiv>
                <ButtonDiv><FiRepeat onClick={()=> taskUpdateFn(todoTask)}></FiRepeat></ButtonDiv>
                <ButtonDiv><FiTrash2 onClick={() => taskDeleteFn(todoTask)}></FiTrash2></ButtonDiv>
            </TaskUpdateButtons>
            </TodoTask>
        }):<LoadingWheel></LoadingWheel>}
    </Todo>
    <InProgress>
        <Head>In Progress</Head>
        <InprogressComponent></InprogressComponent>
    </InProgress>
    <Done>
        <Head>Done</Head>
        <DoneTasks></DoneTasks>
    </Done>
    <TaskModal open = {isOpen} onClose ={() => setIsOpen(false)} taskSelected = {taskSelected}>
    </TaskModal>
    <TaskUpdateModal taskSelected = {taskSelected} setTaskSelected={setTaskSelected} open = {taskUpdateIsopen} onClose ={() => setTaskUpdateisOpen(false)}></TaskUpdateModal>
        </>
  )
}


