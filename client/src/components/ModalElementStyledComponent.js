import styled from "styled-components";
import Select from "react-select";

export const Wrapper = styled.div`
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
export const Label = styled.label`
margin-top:10px;
font-size:15px;
`

export const Input = styled.input`
width:95%;
padding:10px;
margin:10px 0 10px 0;
border:1px solid lightgray;
`

export const Button = styled.button`
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
export const CloseButton = styled.button`
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
export const TextArea = styled.textarea`
width:95%;
padding:10px;
margin:10px 0 10px 0;
border:1px solid lightgray;`

export const ModalContent = styled.div`
padding:20px;
`

export const Form = styled.form`
display : flex;
flex-direction:column;
padding:20px;
background:white;
margin-left:30%;
margin-right:30%;
`
export const Head = styled.div`
font-size:18px;
border-bottom:1px solid lightgray;
padding-bottom:10px;
`
export const Buttons = styled.div`

`
export const Access = styled.div``

export const SelectDD = styled(Select)`
margin:10px 0 10px 0;
width:100%;
padding-right:10px;
`