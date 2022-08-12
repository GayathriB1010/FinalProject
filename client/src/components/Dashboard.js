import { useEffect,useContext,useState } from "react";
import styled from "styled-components";
import { ManagefluentContext } from "./ManagefluentContext";
import LoadingWheel from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import {FiPlusCircle} from "react-icons/fi";
import ModalElement from "./ModalElement";
import {FiHome} from "react-icons/fi";

const Dashboard = () =>{
    const {currentUser,setCurrentUser,projects,setProjects,updateProjects,setUpdateProjects,adminUsers,setAdminUsers} = useContext(ManagefluentContext);
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        const getAllProjects = async() =>{
            const response = await fetch(`/api/all-projects/${currentUser}`);
            const data = await response.json();
            setProjects((data['data']));
        }
        if(currentUser){
            getAllProjects();
        }
    },[currentUser,updateProjects]);

    const navigateToProjectTasks = (projectId) =>{
        navigate(`/project/${projectId}`);
    }

    
    useEffect(() =>{
        const getAdminUsers = async() =>{
            const response = await fetch(`api/get-adminUsers`);
            const data = await response.json();
            setAdminUsers((data['data']));
        }
        if(currentUser){
            getAdminUsers();
        }
    },[currentUser]);
    
    if(projects.length > 0){
        console.log(adminUsers)
    return(
        <PageWrapper>
            <NewProject>
            <Dashboard>
                <FiHome></FiHome>
                Dashboard
            </Dashboard>
                {adminUsers.map((adminUser) =>(
                    adminUser.email === currentUser? 
                            <>
                            <Icon>
                        <FiPlusCircle onClick={() => setIsOpen(true)}></FiPlusCircle>
                        </Icon><CreateProject>Create a new project</CreateProject>
             </>: null))}
                </NewProject>
                <ModalElement open = {isOpen} onClose ={() => setIsOpen(false)}>
                </ModalElement> 
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
       </PageWrapper>
    )
    }
    else{
        return (
            <Wrapper>
              <LoadingWheel />
            </Wrapper>
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
border : 1px solid lightgray;
margin :20px;
padding : 20px;
width : 30%;
box-shadow : 5px 5px 5px 5px lightgray;
`
const Description = styled.div`
color:black;
margin-top : 10px;
`
const Name = styled.div`
color:black;
font-size :24px;
`

const CreateProject = styled.div`
font-size : 1rem;
margin : 10px;
`
const NewProject = styled.div`
display:flex;
color:black;
border : 1px solid lightgray;
width : 100%;
`

const Icon = styled.div`
margin-top :10px;
`
const PageWrapper = styled.div`
display:flex;
justify-content:space-evenly;
`
export default Dashboard