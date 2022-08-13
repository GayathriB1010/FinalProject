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
    const [isAdmin,setIsAdmin] = useState(false);

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
        navigate(`/project/${projectId}`);
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
            <NewProject>
                {adminUsers.map((adminUser) =>(
                    adminUser.email === localStorage.getItem("user")? 
                            <>
                            <Icon>
                        <FiPlusCircle onClick={() => setIsOpen(true)}></FiPlusCircle>
                        </Icon><CreateProject>Create a new project</CreateProject>
                        </>: null))}
                </NewProject>
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
                            <Icon>
                        <FiPlusCircle onClick={() => setIsOpen(true)}></FiPlusCircle>
                        </Icon><CreateProject>Create a new project</CreateProject>
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