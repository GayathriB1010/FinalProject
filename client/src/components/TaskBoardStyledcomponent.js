import styled from "styled-components"
import waterImage1 from "../images/waterImage1.png"

export const Todo = styled.div`
border:1px solid white;
width:25%;
margin-top : 20px;
box-shadow : 2px 2px 2px 2px lightgray;
background-image:url(${waterImage1})
`

export const InProgress = styled.div`
border:1px solid white;
width:25%;
margin-top : 20px;
box-shadow : 2px 2px 2px 2px lightgray;
background-image:url(${waterImage1})
`

export const Done = styled.div`
border:1px solid white;
box-shadow : 2px 2px 2px 2px lightgray;
width:25%;
margin-top : 20px; 
background-image:url(${waterImage1})`

export const NewTask = styled.div`
height : 20vh;
border : .5px solid lightgray;
margin : 20px;
display:flex;
flex-direction:column;
font-family: var(--font);
`;

export const Head = styled.h4`
margin:10px;
color:#484848;`

export const AddTask = styled.button`
position : relative;
font-family: var(--font);
  padding: 10px;
  border: none;
  background: #2bd4d4;;
  color : white;
  width : calc(100% - 20px);
  margin : 10px 10px 10px 10px;
`
export const TaskName = styled.textarea`
margin : 10px;
height : 50%;
border : .5px solid lightgray;
`
export const TodoTask = styled.div`
margin : 20px;
border : 1px solid white;
box-shadow : 2px 2px 2px 2px lightgray;
padding : 20px;
color:black;
font-size:15px;
`

