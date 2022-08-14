import { useEffect,useContext,useState } from "react";
import styled from "styled-components";
import { ManagefluentContext } from "./ManagefluentContext";
import LoadingWheel from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import {FiPlusCircle} from "react-icons/fi";
import ModalElement from "./ModalElement";
import {FiHome} from "react-icons/fi";

const Dashboard = () =>{
    const {currentUser,setCurrentUser,projects,setProjects,updateProjects,setUpdateProjects,adminUsers,setAdminUsers,createProjectClicked,setCreateProjectClicked,selectedProjectId,setSelectedProjectId} = useContext(ManagefluentContext);
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [isAdmin,setIsAdmin] = useState(false);
    const [users,setUsers] = useState([]);
    const allUsers = [];

    useEffect(() =>{
        const getAllProjects = async() =>{
            const response = await fetch(`/api/all-projects/${localStorage.getItem("user")}`);
            const data = await response.json();
            setProjects((data['data']));
        }
        if(localStorage.getItem("user")){
            getAllProjects();
        }
    },[localStorage.getItem("user"),updateProjects]);

    const navigateToProjectTasks = (projectId) =>{
        setSelectedProjectId(projectId);
        navigate(`/project/${projectId}`);
    }

    const CreateProjectClicked = () =>{
        setIsOpen(true);
        setCreateProjectClicked(!createProjectClicked)
    }

    
    useEffect(() =>{
        const getAdminUsers = async() =>{
            const response = await fetch(`api/get-adminUsers`);
            const data = await response.json();
            setAdminUsers((data['data']));
            console.log((data['data']))
        }
        if(localStorage.getItem("user")){
            getAdminUsers();
        }
        if(adminUsers.length>0){
            adminUsers.map((adminUser) =>{
                if(adminUser.email === localStorage.getItem("user")){
                  setIsAdmin(true);
                }
            })
        }
    },[localStorage.getItem("user")]);
 
    
    if(projects.length > 0){
    return(
        <PageWrapper>
        <Sidebar>
        <DashboardIcon>
                <FiHome></FiHome>
                  <Span>Dashboard</Span>
                </DashboardIcon>
            <NewProject>
                {adminUsers.map((adminUser) =>(
                    adminUser.email === localStorage.getItem("user")? 
                            <>
                            <CreateProjectIcon>
                        <FiPlusCircle onClick={() => CreateProjectClicked()}></FiPlusCircle>
                        </CreateProjectIcon><CreateProject>Create a new project</CreateProject>
                        </>: null))}
                </NewProject>
                </Sidebar>
        <MainDiv>
      {projects.map((project) =>{
          return(
              <>
           <ProjectWrapper onClick={() => navigateToProjectTasks(project.projectId)}>
                <Name>{project.projectName}</Name>
                <Description>{project.projectDescription}</Description>
           </ProjectWrapper>
                </>
          )
       })}
       </MainDiv>
       <ModalElement open = {isOpen} onClose ={() => setIsOpen(false)}>
                </ModalElement> 
       </PageWrapper>
       
    )
}
    else{
        return (
            <>
            <NewProject>
                {adminUsers.map((adminUser) =>(
                    adminUser.email === localStorage.getItem("user")? 
                            <>
                            <CreateProjectIcon>
                        <FiPlusCircle onClick={() => setIsOpen(true)}></FiPlusCircle>
                        </CreateProjectIcon><CreateProject>Create a new project</CreateProject>
                        </>: null))}
                </NewProject>
                <ModalElement open = {isOpen} onClose ={() => setIsOpen(false)}>
                </ModalElement> 
                </>
          );
    }
}

const Wrapper = styled.div`
`
const MainDiv = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-evenly;
`
const ProjectWrapper = styled.div`
display:flex;
flex-direction:column;
border : 1px solid white;
margin :20px;
padding : 20px;
width : 30%;
box-shadow : 2px 2px 2px 2px lightgray;
`
const Description = styled.div`
color:black;
margin-top : 10px;
font-size:15px;
`
const Name = styled.div`
color:black;
font-size :18px;
`

const CreateProject = styled.div`
font-size : 15px;
margin : 10px;
`
const NewProject = styled.div`
display:flex;
color:black;
margin : 0 0 20px 30px;
`

const CreateProjectIcon = styled.div`
margin-top :10px;
font-size:15px;
`
const PageWrapper = styled.div`
display:flex;
justify-content:space-evenly;
`

const DashboardIcon = styled.div`
font-size : 18px;
color:#2bd4d4;
margin : 20px 0 20px 30px;
`

const Sidebar = styled.div`
display:flex;
flex-direction:column;
width : 70%;
border-right:1px solid lightgray;
background:#F0F8FF;
`
const Span = styled.span`
margin:10px;
color:#2bd4d4;
font-size:18px;
`
export default Dashboard