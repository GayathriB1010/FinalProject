import React from 'react'
import { useState,useContext,useEffect } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import styled from 'styled-components';
import Select from "react-select";
import LoadingWheel from './LoadingScreen';

export default function TaskModal({open,task,onClose}) {
    const [taskDescription,setStateTaskDescription] = useState(null);
    const {taskClicked,setTaskClicked} =  useContext(ManagefluentContext);
    const [projectAdded,setProjectAdded] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState();
    const [users,setUsers] = useState([]);
    const [usersDropdownList,setUsersDropdownList] = useState([]);
    const [members,setmembers] = useState([])
    const allUsers = [];

  useEffect(() =>{
    const getAllUsers = async() =>{
        const response = await fetch(`/api/get-users/`);
        const data = await response.json();
        setUsers(data.data)
        users.map((user) =>{
          allUsers.push({value:user.email,label:user.email});
        })
        setUsersDropdownList(allUsers);
    }
    if(localStorage.getItem("user")){
      getAllUsers();
    }
},[taskClicked]);

  const setTaskDescription = (e) =>{
    setStateTaskDescription(e.target.value);
  }
  
  function handleSelect(data) {
    setSelectedOptions(data);
    console.log(selectedOptions)
  }

  const updateTask = async() =>{
    const response = await fetch(`/api/update-Task`,{
    method : "PATCH",
    body : JSON.stringify({
        taskId : "e5a841aa-1f5e-415b-b52a-62452ee575fc",
        description : taskDescription,
        assignedTo : selectedOptions
    }),
    headers:{
        "Content-type" :"application/json",
    },
})
.then((res) => res.json())
.then((data) =>{
})
  }


    if(!open)
    {
       return null
    }
    else{
    return(
      <Wrapper>
      <ModalContent>
      <Form>
        <Head>Edit Task</Head>
        <TaskName>Test task</TaskName>
        <Label for = "taskDesc">Task Description:</Label>
        <TextArea id="taskDesc" onChange={(e) => setTaskDescription(e)}></TextArea>
        <Label for="access">Members:</Label>
        <div className="dropdown-container">
        {usersDropdownList.length>0?<Select
          options={usersDropdownList}
          placeholder="Select members"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />:<LoadingWheel></LoadingWheel>}
      </div>
        <Buttons>
       <CloseButton>Close</CloseButton>
       <Button onClick={updateTask()}>
       Save</Button>
       </Buttons>
       </Form>
       </ModalContent>
      </Wrapper>
    )
    }
  }
  
  const Wrapper = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 10%;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  `
  const Label = styled.label`
  margin-top:10px;
  `
  
  const Input = styled.input`
  width:95%;
  padding:10px;
  margin:10px 0 10px 0;
  `
  
  const Button = styled.button`
  margin:10px 10px 10px 10px;
  padding:10px;
  margin-bottom:10px;
  color:white;
  background:none;
  border:1px solid white;
  border-radius : 10px;
  font-family: 'Montserrat', sans-serif;
  background:#2bd4d4;
  border:none;
  `
  const CloseButton = styled.button`
  margin:10px 10px 10px 10px;
  padding:10px;
  margin-bottom:10px;
  color:white;
  background:none;
  border:1px solid white;
  border-radius : 10px;
  font-family: 'Montserrat', sans-serif;
  background:red;
  border:none;
  `
  const TextArea = styled.textarea`
  width:95%;
  padding:10px;
  margin:10px 0 10px 0;`
  
  const ModalContent = styled.div`
  padding:20px;
  `
  
  const Form = styled.form`
  display : flex;
  flex-direction:column;
  padding:20px;
  background:white;
  margin-left:30%;
  margin-right:30%;
  `
  const Head = styled.div`
  font-size:2rem;
  border-bottom:1px solid lightgray;
  padding-bottom:10px;
  `
  const Buttons = styled.div`
  
  `
  const AddToCard = styled.button`
  margin:10px 10px 10px 10px;
  padding:10px;
  margin-bottom:10px;
  color:white;
  background:none;
  border:1px solid white;
  border-radius : 10px;
  font-family: 'Montserrat', sans-serif;
  background:lightgray;
  border:none;
  width : 30%;
  `

  const TaskName = styled.div`
  margin-bottom:10px;`

  const Members = styled.div``

  const HeadAndClose = styled.div`
  display:flex;
  `
  const DisplayMembers = styled.div``