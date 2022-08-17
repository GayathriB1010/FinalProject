import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import styled from 'styled-components';
import Select from 'react-select';
import LoadingWheel from './LoadingScreen';
import useDrivePicker from "react-google-drive-picker";

export default function TaskModal({ open, onClose }) {
	const [ taskDescription, setStateTaskDescription ] = useState(null);
	const {
		taskSelected,setTaskSelected,
		selectedProjectId,
		updateTaskFeed,setupdateTaskFeed
	} = useContext(ManagefluentContext);
	const [openPicker, data, authResponse] = useDrivePicker();

	const [ selectedOptions, setSelectedOptions ] = useState();
	const [ users, setUsers ] = useState([]);
	const [ usersDropdownList, setUsersDropdownList ] = useState([]);
	const [googleDocUrl,setGoogleDocUrl] = useState("");
	const allUsers = [];

	//If there was users previously assigned to this task, those members should get displayed in the default dropdown value
	useEffect(
		() => {
			//When a task is clicked, this method gets all the users of that project
			const getProjectUsers = async () => {
				const response = await fetch(`/api/getProjectUsers/${selectedProjectId}`);
				const data = await response.json();
				setUsers(data.data[0].userId);
				//For React select, this is the data format for the options
				users.map((user) => {
					allUsers.push({ value: user, label: user });
				});
				setUsersDropdownList(allUsers);
				console.log(usersDropdownList)
			};
			if (localStorage.getItem('user')) {
				getProjectUsers();
			}
		},
		[ taskSelected ]
	);

	const setTaskDescription = (e) => {
		setStateTaskDescription(e.target.value);
	};

	function handleSelect(data) {
		setSelectedOptions(data);
	}

	//This method will update the task when save is clicked
	const updateTask = async (e) => {
		e.preventDefault();
		const assingnedMembers = [];
    if(selectedOptions === null || selectedOptions === undefined){
      setSelectedOptions(taskSelected.assignedTo);
    }
    else{
    selectedOptions.map((option) => {
      assingnedMembers.push(option.value);
    });
  }
		const response = await fetch(`/api/update-Task`, {
			method: 'PATCH',
			body: JSON.stringify({
				taskId: taskSelected.taskId,
				description: taskDescription,
				assignedTo: assingnedMembers,
				documents : googleDocUrl
			}),
			headers: {
				'Content-type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				setupdateTaskFeed(!updateTaskFeed)
				//setDefaultValuesPreviouslySelected([]);
				//setSelectedOptions([]);
				setGoogleDocUrl("")
				setTaskSelected(null)
				setSelectedOptions(null)
				onClose();
				
			})
			.then((err) => {
				onClose();
			});
	};

	const closeFn = () =>{
		setGoogleDocUrl("")
		setTaskSelected(null)
		onClose();
	}

	const handleOpenPicker = () => {
		openPicker({
		  clientId:"688130310661-lbtn1a352pvcb8q8t6p8hajdnn8mffeb.apps.googleusercontent.com",
		  developerKey:"AIzaSyB_TajnS_zbw4tmprQzEo113s5xHxGnVNk",
		  viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
		else{
			console.log(data)
        setGoogleDocUrl(data.docs[0].embedUrl)
		console.log(googleDocUrl)
		}
      },
    })
  }
	 
	if (!open) {
		return null;
	} else {
		return (
			<Wrapper>
				<ModalContent>
					<Form onSubmit={(e) => updateTask(e)}>
						<Head>{taskSelected.name}</Head>
						<Label for="taskDesc">Task Description:</Label>
						<TextArea id="taskDesc" onChange={(e) => setTaskDescription(e)}  required>
							{taskSelected.description}
						</TextArea>
						<Label for="access">Members:</Label>
						<div className="dropdown-container">
						{usersDropdownList.length>0?<Select
								defaultValue={taskSelected.assignedTo.map(dropdownValue => ({value:dropdownValue,label:dropdownValue}))}
								options={usersDropdownList}
								placeholder="Select members"
								value={selectedOptions}
								onChange={handleSelect}
								isSearchable={true}
								isMulti
							/>:<LoadingWheel></LoadingWheel>}
						</div>
						<Buttons>
							<Button type="submit">Save</Button>
						</Buttons>
					</Form>
					<button onClick={() => handleOpenPicker()}>Open picker</button>
						{taskSelected.documents!==null?<GoogleDocUrl>{taskSelected.documents}</GoogleDocUrl>:null}
						{googleDocUrl!==null?<GoogleDocUrl>{googleDocUrl}</GoogleDocUrl>:null}
					<CloseButton onClick={() => closeFn()}>Close</CloseButton>
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
const Label = styled.label`
	margin-top: 10px;
	font-size: 15px;
`;

const Input = styled.input`
	width: 95%;
	padding: 10px;
	margin: 10px 0 10px 0;
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
const TextArea = styled.textarea`
	width: 95%;
	padding: 10px;
	margin: 10px 0 10px 0;
`;

const ModalContent = styled.div`padding: 20px;`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px;
	background: white;
	margin-left: 30%;
	margin-right: 30%;
`;
const Head = styled.div`
	font-size: 18px;
	border-bottom: 1px solid lightgray;
	padding-bottom: 10px;
`;
const Buttons = styled.div``;
const AddToCard = styled.button`
	margin: 10px 10px 10px 10px;
	padding: 10px;
	margin-bottom: 10px;
	color: white;
	background: none;
	border: 1px solid white;
	border-radius: 10px;
	font-family: "Montserrat", sans-serif;
	background: lightgray;
	border: none;
	width: 30%;
`;

const TaskName = styled.div`margin-bottom: 10px;`;

const Members = styled.div``;

const HeadAndClose = styled.div`display: flex;`;
const DisplayMembers = styled.div``;

const GoogleDocUrl = styled.div``