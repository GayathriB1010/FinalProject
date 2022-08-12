import { useEffect,useContext } from "react";
import styled from "styled-components";
import { ManagefluentContext } from "./ManagefluentContext";
import LoadingWheel from "./LoadingScreen";
import { useNavigate } from "react-router-dom";

const Dashboard = () =>{
    const {currentUser,setCurrentUser,projects,setProjects,updateProjects,setUpdateProjects} = useContext(ManagefluentContext);
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
    
    if(projects.length > 0){
    return(
        <MainDiv>
      {projects.map((project) =>{
          return(
           <ProjectWrapper onClick={() => navigateToProjectTasks(project.projectId)}>
                <Name>{project.projectName}</Name>
                <Description>{project.projectDescription}</Description>
           </ProjectWrapper>
          )
       })}
       </MainDiv>
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
export default Dashboard