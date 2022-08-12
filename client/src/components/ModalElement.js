import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ManagefluentContext } from './ManagefluentContext';

export default function ModalElement({open,onClose}) {
  const [projectName,setStateProjectName] = useState(null);
  const [projectDescription,setStateProjectDescription] = useState(null);
  const {currentUser,updateProjects,setUpdateProjects} =  useContext(ManagefluentContext);
  const [projectAdded,setProjectAdded] = useState(false);

  const addNewProject = (e) =>{
    fetch(`/api/project/add-project`,{
        method : "POST",
        body : JSON.stringify({
          projectName:projectName,
          projectDescription:projectDescription,
          createdBy:currentUser,
        }),
        headers:{
            "Content-type" :"application/json",
        },
    })
    .then((res) => res.json())
    .then((data) =>{
        setUpdateProjects(!updateProjects);
    })
}

const setProjectName = (e) =>{
  setStateProjectName(e.target.value);
}

const setProjectDescription = (e) =>{
  setStateProjectDescription(e.target.value);
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
      <Head>New Project</Head>
      <Label for= "projectName">Project Name:</Label>
      <Input id="projectName" type = "text" onChange={(e) => setProjectName(e)}></Input>
      <Label for = "projectDesc">Project Description:</Label>
      <TextArea onChange={(e) => setProjectDescription(e)}></TextArea>
      <Buttons>
     <CloseButton onClick={onClose}>Close</CloseButton>
     <Button onClick = {(e) => addNewProject(e)}
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