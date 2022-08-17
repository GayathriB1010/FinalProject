import styled from 'styled-components';
import Select from 'react-select';
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	left: 0;
	top: 10%;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;
export const Label = styled.label`
	margin-top: 10px;
	font-size: 15px;
`;

export const Input = styled.input`
	width: 95%;
	padding: 10px;
	margin: 10px 0 10px 0;
`;

export const Button = styled.button`
	margin: 10px 10px 10px 10px;
	padding: 5px;
	color: white;
	background: none;
	border: 1px solid white;
	border-radius: 10px;
	font:var(--font);
	font-size:15px;
	background: #2bd4d4;
	border: none;
	&:hover{
		cursor:pointer;
	}
`;
export const CloseButton = styled.button`
	margin: 10px 10px 10px 5px;
	padding: 10px;
	margin-bottom: 10px;
	color: black;
	background: none;
	border: 1px solid white;
	border-radius: 10px;
	font:var(--font);
	font-size:15px;
	background: none;
	border: none;
	&:hover{
		background: #f2f2f2;
		cursor:pointer;
	}
`;
export const GoogleDriveButton = styled.button`
margin: 10px 10px 10px 0px;
	padding: 10px;
	color: black;
	border: 1px solid white;
	border-radius: 10px;
	font:var(--font);
	background: red;
	border: none;
	width:100px;
	font-size:15px;
	background:#f2f2f2;
`

export const TextArea = styled.textarea`
	width: 95%;
	padding: 10px;
	margin: 10px 0 10px 0;
`;

export const ModalContent = styled.div`padding: 20px;`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px;
	background: white;
	margin-left: 30%;
	margin-right: 30%;
`;
export const Head = styled.div`
	font-size: 18px;
	border-bottom: 1px solid lightgray;
	padding-bottom: 10px;
`;
export const Buttons = styled.div``;
export const AddToCard = styled.button`
	margin: 10px 10px 10px 10px;
	padding: 10px;
	margin-bottom: 10px;
	color: white;
	background: none;
	border: 1px solid white;
	border-radius: 10px;
	font:var(--font);
	background: lightgray;
	border: none;
	width: 30%;
`;

export const TaskName = styled.div`margin-bottom: 10px;`
export const Members = styled.div``;

export const HeadAndClose = styled.div`display: flex;`;
export const DisplayMembers = styled.div``;

export const GoogleDocUrl = styled.div``

export const SelectDropDown = styled(Select)`
font-size:15px;
margin-top:10px;
`

export const StyledLink = styled.a`
font:var(--font);
font-size:15px;
color:blue;
margin-left:10px;
display: "table-cell"
`