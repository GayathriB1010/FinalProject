import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { ManagefluentContext } from './ManagefluentContext';
import LoadingWheel from './LoadingScreen';
import useDrivePicker from "react-google-drive-picker";

import{TaskName,Members,HeadAndClose,DisplayMembers,GoogleDocUrl,SelectDropDown,StyledLink,TextArea,ModalContent,Form,Head,Buttons,AddToCard,Wrapper,Label,Input,Button,CloseButton,GoogleDriveButton
} from "./TaskModalStyledComponent"

export default function TaskModal({ open, onClose }) {
	const [ taskDescription, setStateTaskDescription ] = useState("");
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
				documents : googleDocUrl?googleDocUrl:taskSelected.documents
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
		  clientId:"688130310661-9t6eun1j9hskmdk7rf0umpp9ecadlae3.apps.googleusercontent.com",
		  developerKey:"AIzaSyD-4L9yhAe7p73oL4a1ic04CvKEbDsQu7c",
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

