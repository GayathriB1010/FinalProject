import React from 'react'
import { useState,useContext } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import styled from 'styled-components';

export default function TaskModal({open,name,onClose}) {
    const {currentUser,updateProjects,setUpdateProjects} =  useContext(ManagefluentContext);
  
    if(!open)
  {
     return null
  }
  else{
    return(
      <Wrapper>
      <TaskName>{name}</TaskName>
        <Label for = "taskDesc">Task Description</Label>
       <TextArea></TextArea>
       <Button onClick={onClose}>Close</Button>
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

  const TaskName = styled.div``