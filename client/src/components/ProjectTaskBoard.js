import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingWheel from "./LoadingScreen";
import { ManagefluentContext } from "./ManagefluentContext";
import TaskBoards from "./TaskBoards";
import waterImage1 from "../images/waterImage1.png"
import {FiTrash2, FiEdit,FiCheckSquare} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

//This component is to display the side bar and rendering the TaskBoards
const ProjectTaskBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  //To set the task selected and pass it on to the task modal
  const [taskSelected, setTaskSelected] = useState(null);
  const { selectedProjectId, selectedProjectProperties,updateProjects,setUpdateProjects } =
    useContext(ManagefluentContext);
  const [users, setUsers] = useState([]);
  const allUsers = [];
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  //This method is to get the users of the selected projecct
  useEffect(() => {
    const getProjectUsers = async () => {
      const response = await fetch(`/api/getProjectUsers/${selectedProjectId}`);
      const data = await response.json();
      setUsers(data.data[0].userId);
    };
    if (localStorage.getItem("user")) {
      getProjectUsers();
    }
  }, [selectedProjectId]);

  
         //This function will get invoked when a delete project button is clicked
         const projectDeleteFn = (project) =>{
          fetch(`/api/delete-project/${project.projectId}`, {
              method: "DELETE", 
              headers: {
                  "Content-Type": "application/json",
                },
            }).then((res) =>
            //When the project is deleted, updateProjects will be set to !updateProjects
            setUpdateProjects(!updateProjects))
            navigate("/dashboard")
              }
  

  //if there are users for the project, this will render the side bar and TaskBoards component
  if (users.length > 0) {
    return (
      <MainDiv>
        <Sidebar>
          <DashboardIcon>
            <Span>Boards</Span>
            </DashboardIcon>
            <DeleteProject>
            {selectedProjectProperties.createdBy === localStorage.getItem("user")? 
                            <>
                            <DeleteProjectIcon><FiTrash2 onClick={() => projectDeleteFn(selectedProjectProperties)}></FiTrash2></DeleteProjectIcon>
                          <DeleteButton>Delete Project</DeleteButton>
                        </>: null}
                        </DeleteProject>
          <Members>Members</Members>
          <MemberList>
            {users.map((user) =>{
              return <User>{user.split("@")[0]}</User>
            })}
          </MemberList>
        </Sidebar>
          <TaskBoards></TaskBoards>
      </MainDiv>
    );
  } else {
    <LoadingWheel></LoadingWheel>;
  }
};

const MainDiv = styled.div`
  display: flex;
  gap: 30px;
  background-image:url(${waterImage1})
  height:100vh
`;
const Sidebar = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;
  background:#f2f2f2;
  height:100vh;
`;

const DashboardIcon = styled.div`
  font-size: 18px;
  color: #2bd4d4;
  margin: 20px 0 20px 30px;
`;

const Span = styled.span``;

const Members = styled.div`
  font-size: 15px;
  color: #2bd4d4;
  margin: 20px 0 20px 30px;
`;

const MemberList = styled.div`
font-size:15px;
margin: 0px 0 15px 30px;
`
const User = styled.div`
margin-bottom:10px;
`
const DeleteButton = styled.div`
font-size : 15px;
margin : 10px;
color:black;
`

const DeleteProjectIcon = styled.div`
margin-top :10px;
font-size:15px;
color:black;
`

const DeleteProject = styled.div`
display:flex;
color:black;
margin : 0 0 20px 30px;
`

export default ProjectTaskBoard;
