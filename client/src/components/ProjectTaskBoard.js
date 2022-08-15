import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingWheel from "./LoadingScreen";
import { ManagefluentContext } from "./ManagefluentContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TaskModal from "./TaskModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoards from "./TaskBoards";
import waterImage1 from "../images/waterImage1.png"

const ProjectTaskBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  //To set the task selected and pass it on to the task modal
  const [taskSelected, setTaskSelected] = useState(null);
  const { selectedProjectId, projectClicked, setProjectClicked } =
    useContext(ManagefluentContext);
  const [users, setUsers] = useState([]);
  const allUsers = [];
  const [userList, setUserList] = useState([]);

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

  if (users.length > 0) {
    console.log(users)
    return (
      <MainDiv>
        <Sidebar>
          <DashboardIcon>
            <Span>Boards</Span>
          </DashboardIcon>
          <Members>Members</Members>
          <MemberList>
            {users.map((user) =>{
              return <User>{user.split("@")[0]}</User>
            })}
          </MemberList>
        </Sidebar>
        <DndProvider backend={HTML5Backend}>
          <TaskBoards></TaskBoards>
        </DndProvider>
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
`;
const Sidebar = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid lightgray;
  background: #f0f8ff;
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
export default ProjectTaskBoard;
