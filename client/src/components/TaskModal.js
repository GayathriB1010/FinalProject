import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import styled from 'styled-components';
import Select from 'react-select';
import LoadingWheel from './LoadingScreen';
import useDrivePicker from "react-google-drive-picker";
import { Link } from "react-router-dom";

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

	const closeFn = (e) =>{
		e.preventDefault();
		e.stopPropagation();
		setGoogleDocUrl("")
		setTaskSelected(null)
		onClose();
	}

	const handleOpenPicker = (e) => {
		e.preventDefault();
		e.stopPropagation();
		openPicker({
		  clientId:"688130310661-ja83lc3m7ir6m0nbu6o162m8ldbdch9v.apps.googleusercontent.com",
		  developerKey:"AIzaSyCk_4s_82guXLtg-qWbGcwn92AceiDSn2Y",
		  viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
        }
		else{
        setGoogleDocUrl(data.docs[0].embedUrl)
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
						{usersDropdownList.length>0?<SelectDropDown
								defaultValue={taskSelected.assignedTo.map(dropdownValue => ({value:dropdownValue,label:dropdownValue}))}
								options={usersDropdownList}
								placeholder="Select members"
								value={selectedOptions}
								onChange={handleSelect}
								isSearchable={true}
								isMulti
							/>:<LoadingWheel></LoadingWheel>}
						</div>
						<GoogleDriveButton onClick={(e) => handleOpenPicker(e)}>Attachment</GoogleDriveButton>
						{taskSelected.documents!==""?
						<>
						<GoogleDocUrl><StyledLink href={taskSelected.documents}>Click here to open the Attachment</StyledLink></GoogleDocUrl></>:null}
						{googleDocUrl!==""?	<>	<GoogleDocUrl><StyledLink  href={taskSelected.documents} target = "_blank" 
						rel = "noopener noreferrer">Click here to open the Attachment</StyledLink></GoogleDocUrl></>:null}
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
const GoogleDriveButton = styled.button`
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
	font:var(--font);
	background: lightgray;
	border: none;
	width: 30%;
`;

const TaskName = styled.div`margin-bottom: 10px;`;

const Members = styled.div``;

const HeadAndClose = styled.div`display: flex;`;
const DisplayMembers = styled.div``;

const GoogleDocUrl = styled.div``

const SelectDropDown = styled(Select)`
font-size:15px;
margin-top:10px;
`

const StyledLink = styled.a`
font:var(--font);
font-size:15px;
color:blue;
margin-left:10px;
display: "table-cell"
`