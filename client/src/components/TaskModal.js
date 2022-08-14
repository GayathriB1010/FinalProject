import React from 'react'
import { useState,useContext,useEffect } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import styled from 'styled-components';
import Select from "react-select";
import LoadingWheel from './LoadingScreen';

export default function TaskModal({open,taskSelected,onClose}) {
    const [taskDescription,setStateTaskDescription] = useState(null);
    const {taskClicked,setTaskClicked,selectedProjectId,setSelectedProjectId} =  useContext(ManagefluentContext);
    const [projectAdded,setProjectAdded] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState();
    const [users,setUsers] = useState([]);
    const [usersDropdownList,setUsersDropdownList] = useState([]);
    const [members,setmembers] = useState([])
   const allUsers = [];

  useEffect(() =>{
    console.log(selectedProjectId)
    const getProjectUsers = async() =>{
        const response = await fetch(`/api/getProjectUsers/${selectedProjectId}`);
        const data = await response.json();
        setUsers(data.data[0].userId)
        users.map((user) =>{
          allUsers.push({value:user,label:user});
        })
        setUsersDropdownList(allUsers);
    }
    if(localStorage.getItem("user")){
      getProjectUsers();
    }
},[taskClicked]);

  const setTaskDescription = (e) =>{
    setStateTaskDescription(e.target.value);
  }
  
  function handleSelect(data) {
    setSelectedOptions(data)
    }

    // const previousSelection = () =>{
    //   if(taskSelected.assignedTo.length>0){
    //     taskSelected.assignedTo.map((option) =>{
    //       previouslySelectedOptions.push({value:option,label:option})
    //     })
    //     console.log(previouslySelectedOptions)
    //   }
    // }

  const updateTask = async() =>{
    const assingnedMembers = [];
    selectedOptions.map((option) =>{
      assingnedMembers.push(option.value);
    })
    const response = await fetch(`/api/update-Task`,{
    method : "PATCH",
    body : JSON.stringify({
        taskId : '8cf9b4f0-14b1-4953-909c-ae79df591f7b',
        description : taskDescription,
        assignedTo : assingnedMembers
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
      console.log(usersDropdownList)
    return(
      <Wrapper>
      <ModalContent>
      <Form>
        <Head>{taskSelected.name}</Head>
        <Label for = "taskDesc">Task Description:</Label>
        <TextArea id="taskDesc" onChange={(e) => setTaskDescription(e)}>{taskSelected.description}</TextArea>
        <Label for="access">Members:</Label>
        <div className="dropdown-container">
        {usersDropdownList.length>0?<Select
          options={usersDropdownList}
          placeholder="Select members"
          value={selectedOptions}
          onChange ={handleSelect}
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