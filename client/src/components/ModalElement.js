import React from 'react';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ManagefluentContext } from './ManagefluentContext';
import LoadingWheel from './LoadingScreen';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Wrapper,Label,Input,Button,CloseButton,TextArea,ModalContent,Form,Head,Buttons,Access,SelectDD
} from "./ModalElementStyledComponent"

//This component opens when create project button is clicked
export default function ModalElement({open,onClose}) {
  const [projectName,setStateProjectName] = useState(null);
  const [projectDescription,setStateProjectDescription] = useState(null);
  const {currentUser,updateProjects,setUpdateProjects,createProjectClicked,setCreateProjectClicked} =  useContext(ManagefluentContext);
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);
  const allUsers = [];
  const [usersDropdownList,setUsersDropdownList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();

  //This method will get invoked when create project button is clicked
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

//This is to fetch all the users in the db, to display in access members dropdown while creating the project
useEffect(() =>{
  const getAllUsers = async() =>{
      const response = await fetch(`/api/get-users/`);
      const data = await response.json();
      setUsers(data.data)
      users.map((user) =>{
        if(user !== localStorage.getItem("user")){
        allUsers.push({value:user.email,label:user.email});
        }
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
      <Input id="projectName" type = "text" onChange={(e) => setProjectName(e)}required></Input>
      <Label for = "projectDesc">Project Description:</Label>
      <TextArea onChange={(e) => setProjectDescription(e)} required></TextArea>
      <Label for = "access">Access:</Label>
      <Access className="dropdown-container">
        {usersDropdownList.length>0?<SelectDD
          options={usersDropdownList}
          placeholder="Select members"
          value={selectedOptions}
          onChange ={handleSelect}
          isSearchable={true}
          isMulti
          required
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

