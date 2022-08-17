import React from 'react'
import { useContext, useEffect,useState } from "react"
import styled from "styled-components"
import LoadingWheel from "./LoadingScreen";
import { ManagefluentContext } from "./ManagefluentContext";
import TaskModal from "./TaskModal";
import {FiTrash2, FiEdit} from "react-icons/fi";
import {FiRepeat} from "react-icons/fi";
import TaskUpdateModal from "./TaskUpdateModal"

import {
    Assignee,Assignees,TaskUpdateButtons,ButtonDiv,GoogleDocUrl,StyledLink
} from "./TaskboardCommonStyledComponents"

export default function DoneTasks() {
    const {doneTasks,setDoneTasks,selectedProjectId,name,setName,updateTaskFeed,setupdateTaskFeed,taskClicked,setTaskClicked, taskSelected,setTaskSelected,defaultValuesPreviouslySelected, setDefaultValuesPreviouslySelected} = useContext(ManagefluentContext);

    const [isOpen,setIsOpen] = useState(false);

    //state to set open for the taskupdateModal
    const [taskUpdateIsopen,setTaskUpdateisOpen] = useState(false);

    //This use effect will get all the done tasks when updateFeed changes
    //updateFeed is changed when a task status is updated
    useEffect(() =>{
        const getAlldoneTasks = async() =>{
            const response = await fetch(`/api/project/${selectedProjectId}/done`);
            const data = await response.json();
            setDoneTasks(data.data)
        }
        if(localStorage.getItem("user")){
            getAlldoneTasks();
        }
    },[updateTaskFeed]);

    //This function will get invoked when a task is clicked
    const taskClickFn = (todoTask) =>{
        let previouslySelectedOptions = [];
        setTaskClicked(!taskClicked)
        setTaskSelected(todoTask)
        if (taskSelected !== null) {
          //If the task is assigned to people, set the default values of dropdown to previous selected options
          if (taskSelected.assignedTo.length > 0) {
            taskSelected.assignedTo.map((option) => {
              previouslySelectedOptions.push({ value: option, label: option });
            });
            //else if the task is not assigned to anyone, set the default values of dropdown to ""
          }
          //This is to set the default values of the members dropdown
           setDefaultValuesPreviouslySelected(previouslySelectedOptions);
        }
        setIsOpen(true)
    }

    //This function will set the taskupdate modal to be true
    const taskUpdateFn = (todoTask) =>{ 
        setTaskSelected(todoTask)
        setTaskUpdateisOpen(true)
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
          setupdateTaskFeed(!updateTaskFeed))
            }
    
  return (
      <>
    <DoneMainDiv>
        {doneTasks!==[] ? doneTasks.map((doneTask) =>{
            return <DoneTask>{doneTask.name}{doneTask.assignedTo.map((assignee) =>{
                return <Assignees>
                <Assignee>
                {assignee.split("@")[0]}
                </Assignee></Assignees>
            })}
             {doneTask.documents?<><GoogleDocUrl><StyledLink href={doneTask.documents}>Click here to open the Attachment</StyledLink></GoogleDocUrl></>:null}
            <TaskUpdateButtons>
                <ButtonDiv><FiEdit onClick={() => taskClickFn(doneTask)}></FiEdit></ButtonDiv>
                <ButtonDiv><FiRepeat onClick={()=> taskUpdateFn(doneTask)}></FiRepeat></ButtonDiv>
                <ButtonDiv><FiTrash2 onClick={() => taskDeleteFn(doneTask)}></FiTrash2></ButtonDiv>
            </TaskUpdateButtons>
            </DoneTask>
        }):<></>}
    </DoneMainDiv>
    <TaskModal open = {isOpen} onClose ={() => setIsOpen(false)} taskSelected = {taskSelected}>
    </TaskModal>
    <TaskUpdateModal taskSelected = {taskSelected} open = {taskUpdateIsopen} onClose ={() => setTaskUpdateisOpen(false)}></TaskUpdateModal>
        </>
  )
}


const DoneMainDiv = styled.div`

`

const DoneTask = styled.div`
margin : 20px;
border : 1px solid white;
box-shadow : 2px 2px 2px 2px lightgray;
padding : 20px;
color:black;
font-size:15px;
`