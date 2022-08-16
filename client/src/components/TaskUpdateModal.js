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

	const updateDoneStatus = ((e) =>{
		e.preventDefault();
		e.target.style.backgroundColor = 'green';
		e.target.style.color = 'white';
		setStatus("done")
	})

	const updateInprogressStatus = (e) =>{
		e.preventDefault();
		e.target.style.backgroundColor = 'blue';
		e.target.style.color = 'white';
		setStatus("inProgress")
	}
	const updateTodoStatus = (e) =>{
		e.preventDefault();
		e.target.style.backgroundColor = 'salmon';
		e.target.style.color = 'white';
		setStatus("todo")
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
						</Buttons>
					</Form>
					<CloseButton onClick={onClose}>Close</CloseButton>
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
	padding: 10px;
	margin-bottom: 10px;
	color: white;
	background: none;
	border: 1px solid white;
	border-radius: 10px;
	font-family: "Montserrat", sans-serif;
	background: #2bd4d4;
	border: none;
`;
const CloseButton = styled.button`
	margin: 10px 10px 10px 10px;
	padding: 10px;
	margin-bottom: 10px;
	color: white;
	background: none;
	border: 1px solid white;
	border-radius: 10px;
	font-family: "Montserrat", sans-serif;
	background: red;
	border: none;
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
`
