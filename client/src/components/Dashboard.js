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
            console.log(response);
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
        console.log(projects)
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
        console.log("I am here")
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
`
const ProjectWrapper = styled.div`
display:flex;
flex-direction:column;
width : 30%;
border : 1px solid lightgray;
margin :20px;
padding : 20px;
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