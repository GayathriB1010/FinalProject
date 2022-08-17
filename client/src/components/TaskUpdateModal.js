import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import styled from 'styled-components';
import Select from 'react-select';
import LoadingWheel from './LoadingScreen';

export default function TaskModal({ open,taskSelected,onClose,usersDropdownList }) {
	const [status,setStatus] = useState(null);
	const {updateTaskFeed,setupdateTaskFeed} = useContext(ManagefluentContext);
	
	// //This method will update the task when status buttons are clicked
	const updateStatus = async (e) => {
		e.preventDefault();
		const assingnedMembers = [];
		const taskId = taskSelected.taskId;
		const response = await fetch(`/api/updateStatus/${taskId}`, {
			method: 'PATCH',
			body: JSON.stringify({
				status:status
			}),
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				onClose();
			})
			.then((err) => {
				onClose();
			});
			setupdateTaskFeed(!updateTaskFeed)
	};

	//When the status done button is clicked, status is set as done
	const updateDoneStatus = ((e) =>{
		e.preventDefault();
		e.target.style.backgroundColor = 'green';
		e.target.style.color = 'white';
		setStatus("done")
	})

	//When the status in progress button is clicked, status is set as in progress
	const updateInprogressStatus = (e) =>{
		e.preventDefault();
		e.target.style.backgroundColor = 'blue';
		e.target.style.color = 'white';
		setStatus("inProgress")
	}

	//When the status todo button is clicked, status is set as todo
	const updateTodoStatus = (e) =>{
		e.preventDefault();
		e.target.style.backgroundColor = 'salmon';
		e.target.style.color = 'white';
		setStatus("todo")
	}

	const closeFn = (e) =>{
		e.preventDefault();
		e.stopPropagation();
		onClose();
	}
	
	if (!open) {
		return null;
	} else {
		return (
			<Wrapper>
				<ModalContent>
					<Form onSubmit={(e) => updateStatus(e)}>
					<Head>Edit progress for the task:{taskSelected.name}</Head>
						<StatusUpdateButtons>
							<StatusButton onClick={(e) => updateTodoStatus(e)}>Todo</StatusButton>
							<StatusButton onClick={(e) => updateInprogressStatus(e)}>In Progress</StatusButton>
							<StatusButton onClick={(e) =>updateDoneStatus(e)}>Done</StatusButton>
						</StatusUpdateButtons>
						<Buttons>
							<Button type="submit">Save</Button>
							<CloseButton onClick={(e) => closeFn(e)}>Close</CloseButton>
						</Buttons>
					</Form>
				</ModalContent>
			</Wrapper>
		);
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
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const Button = styled.button`
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
const CloseButton = styled.button`
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

const ModalContent = styled.div`padding: 20px;`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px;
	background: white;
	margin-left: 30%;
	margin-right: 30%;
	width:500px;
`;
const Head = styled.div`
	font-size: 18px;
	border-bottom: 1px solid lightgray;
	padding-bottom: 10px;
`;
const Buttons = styled.div``;

const StatusUpdateButtons = styled.div`
margin-top : 20px;
margin-bottom: 10px;
`

const StatusButton = styled.button`
padding:5px;
background:white;
border:1px solid blue;
font-family:var(--font);
&:hover{
	background: #f2f2f2;
	cursor:pointer;
}
`
