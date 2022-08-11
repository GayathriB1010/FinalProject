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
    console.log(currentUser)
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
    console.log(open)
     return null
  }
  else{
  return(
    <Wrapper>
      <Label for= "projectName">Project Name:</Label>
      <Input id="projectName" type = "text" onChange={(e) => setProjectName(e)}></Input>
      <Label for = "projectDesc">Project Description:</Label>
      <TextArea onChange={(e) => setProjectDescription(e)}></TextArea>
     <Button onClick={onClose}>Close</Button>
     <Button onClick = {(e) => addNewProject(e)}
     >Create Project</Button>
    </Wrapper>
  )
  }
}

const Wrapper = styled.div`
display : flex;
flex-direction:column;
`
const Label = styled.label``

const Input = styled.input``

const Button = styled.button``

const TextArea = styled.textarea``