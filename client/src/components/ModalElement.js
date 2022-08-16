import React from 'react';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ManagefluentContext } from './ManagefluentContext';
import Select from "react-select";
import LoadingWheel from './LoadingScreen';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalElement({open,onClose}) {
  const [projectName,setStateProjectName] = useState(null);
  const [projectDescription,setStateProjectDescription] = useState(null);
  const {currentUser,updateProjects,setUpdateProjects,createProjectClicked,setCreateProjectClicked} =  useContext(ManagefluentContext);
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);
  const allUsers = [];
  const [usersDropdownList,setUsersDropdownList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();

  const addNewProject = (e) =>{
    e.preventDefault();
    toast.success('New project created !', {
      position: toast.POSITION.TOP_RIGHT
  }); 
  //This set time out is for the notification
  setTimeout(() =>{
    const usersArray = [];
    selectedOptions.map((option) =>{
      usersArray.push(option.value);
    })
    usersArray.push(localStorage.getItem("user"))
    fetch(`/api/project/add-project`,{
        method : "POST",
        body : JSON.stringify({
          projectName:projectName,
          projectDescription:projectDescription,
          createdBy:localStorage.getItem("user"),
          userId:usersArray
        }),
        headers:{
            "Content-type" :"application/json",
        },
    })
    .then((res) => res.json())
    .then((data) =>{
        setUpdateProjects(!updateProjects);
        setSelectedOptions(null);
        onClose();
    })
  },800)
}

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
},[createProjectClicked]);

const setProjectName = (e) =>{
  setStateProjectName(e.target.value);
}

const setProjectDescription = (e) =>{
  setStateProjectDescription(e.target.value);
}

function handleSelect(data) {
  setSelectedOptions(data)
  }

  if(!open)
  {
     return null
  }
  else{
  return(
    <Wrapper>
    <ToastContainer autoClose={800}/>
    <ModalContent>
    <Form onSubmit={(e) => addNewProject(e)}>
      <Head>New Project</Head>
      <Label for= "projectName">Project Name:</Label>
      <Input id="projectName" type = "text" onChange={(e) => setProjectName(e)}></Input>
      <Label for = "projectDesc">Project Description:</Label>
      <TextArea onChange={(e) => setProjectDescription(e)}></TextArea>
      <Label for = "access">Access:</Label>
      <Access className="dropdown-container">
        {usersDropdownList.length>0?<SelectDD
          options={usersDropdownList}
          placeholder="Select members"
          value={selectedOptions}
          onChange ={handleSelect}
          isSearchable={true}
          isMulti
        />:<LoadingWheel></LoadingWheel>}
      </Access>
      <Buttons>
     <CloseButton onClick={onClose}>Close</CloseButton>
     <Button type='submit'
     >Create Project</Button>
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
font-size:15px;
`

const Input = styled.input`
width:95%;
padding:10px;
margin:10px 0 10px 0;
border:1px solid lightgray;
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
margin:10px 0 10px 0;
border:1px solid lightgray;`

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
font-size:18px;
border-bottom:1px solid lightgray;
padding-bottom:10px;
`
const Buttons = styled.div`

`
const Access = styled.div``

const SelectDD = styled(Select)`
margin:10px 0 10px 0;
width:100%;
padding-right:10px;
`