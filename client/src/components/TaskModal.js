import React from 'react'
import { useState,useContext } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import styled from 'styled-components';

export default function TaskModal({open,task,onClose}) {
    const [taskDescription,setStateTaskDescription] = useState(null);
    const {currentUser,updateProjects,setUpdateProjects} =  useContext(ManagefluentContext);
    const [projectAdded,setProjectAdded] = useState(false);
  
   
  const setTaskDescription = (e) =>{
    setStateTaskDescription(e.target.value);
  }
  
    if(!open)
    {
       return null
    }
    else{
      console.log(task);
    return(
      <Wrapper>
      <ModalContent>
      <Form>
        <Head>Edit Task</Head>
        <TaskName>Test task</TaskName>
        <Members>Members</Members>
        <Label for = "taskDesc">Task Description:</Label>
        <TextArea id="taskDesc" onChange={(e) => setTaskDescription(e)}></TextArea>
        <Buttons>
       <CloseButton onClick={onClose}>Close</CloseButton>
       <Button>
       Save</Button>
       </Buttons>
       <Label for="addtoCard">Add to card</Label>
        <AddToCard>Members</AddToCard>
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