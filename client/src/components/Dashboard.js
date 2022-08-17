import { useEffect,useContext,useState } from "react";
import styled from "styled-components";
import { ManagefluentContext } from "./ManagefluentContext";
import { useNavigate } from "react-router-dom";
import ModalElement from "./ModalElement";
import { ToastContainer,toast } from "react-toastify";
import {FiPlusCircle} from "react-icons/fi";
import {FiHome} from "react-icons/fi";

import{
    Wrapper,MainDiv,Projects,Description,Name,CreateProject,NewProject,CreateProjectIcon,PageWrapper,DashboardIcon,Sidebar,Span,RecentProjects,RecentProjectDiv,RecentProjectItems,CreatedBy,Li,PageNumberul
} from "./DashboardStyledComponent"

//Dashboard component is where all the projects assigned or created by the user is displayed
const Dashboard = () =>{
    const {projects,setProjects,updateProjects,adminUsers,setAdminUsers,createProjectClicked,setCreateProjectClicked,setSelectedProjectId,recentProjects,setRecentProjects,setUpdateProjects,selectedProjectProperties,setSelectedProjectProperties} = useContext(ManagefluentContext);
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [isAdmin,setIsAdmin] = useState(false);
    const [currentPage,setCurrentPage]  = useState(1);
    const [projectsPerPage,setProjectsPerPage] = useState(9);

    //This use effect is to get all projects of the signed in user. User signed in stored in local storage
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


    //This use effect is to get recent projects of the signed in user
    useEffect(() =>{
        const getRecentProjects = async() =>{
            const response = await fetch(`/api/get-recentProjects/${localStorage.getItem("user")}`);
            const data = await response.json();
            setRecentProjects((data['data']));
        }
        if(localStorage.getItem("user")){
            getRecentProjects();
        }
    },[localStorage.getItem("user"),updateProjects]);

    //This method is to navigate to the project when clicked
    const navigateToProjectTasks = (project) =>{
        navigate(`/project/${project.projectId}`);
        setSelectedProjectId(project.projectId);
        setSelectedProjectProperties(project);
    }

    //Once the create project button is clicked, it will set the modal open to be true and Modal element is opened      
    const CreateProjectClicked = () =>{
        setIsOpen(true);
        setCreateProjectClicked(!createProjectClicked)
    }

    //Once the recent project in the nav bar is clicked, it will navigate to the projects
    const projectClickedFn = (recentProject) =>{
        navigate(`/project/${recentProject.projectId}`);
        setSelectedProjectId(recentProject.projectId);
        setSelectedProjectProperties(recentProject);
    }
    
    //This use effect is to get admin users. Only admin user can create a project. Admin users is looped through to find if the signed in user is admin
    useEffect(() =>{
        const getAdminUsers = async() =>{
            const response = await fetch(`api/get-adminUsers`);
            const data = await response.json();
            setAdminUsers((data['data']));
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

    //This method is to click pages
    const handlePageClick =(e) =>{
        setCurrentPage(Number(e.target.id));
    }
 
    //If project is not null,project page is rendered
    if(projects.length > 0){
        const indexOfLastProject = currentPage * projectsPerPage;
        const indexOfFirstProject = indexOfLastProject - projectsPerPage;
        const currentProjects = projects.slice(indexOfFirstProject,indexOfLastProject)
          // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
            pageNumbers.push(i);
          }
    return(
        <>
        <PageWrapper>
        {/* Side bar displays the recent project and create project option*/}
        <Sidebar>
        <DashboardIcon>
                <FiHome></FiHome>
                  <Span>Dashboard</Span>
                </DashboardIcon>
            <NewProject>
                {/*This is mapping through all the admin users and if the current user is admin user, they can create a project */}
                {adminUsers.map((adminUser) =>(
                    adminUser.email === localStorage.getItem("user")? 
                            <>
                            <CreateProjectIcon>
                        <FiPlusCircle onClick={() => CreateProjectClicked()}></FiPlusCircle>
                        </CreateProjectIcon><CreateProject>Create a new project</CreateProject>
                        </>: null))}
                </NewProject>
                <RecentProjects>Recent Projects</RecentProjects>
                <RecentProjectDiv>{recentProjects.length>0?
                    recentProjects.map((recentProject) =>{
                        return <RecentProjectItems onClick={() => projectClickedFn(recentProject)}>{recentProject.projectName}</RecentProjectItems>
                    })
               :null}
               </RecentProjectDiv>
                </Sidebar>
        <MainDiv>
      {currentProjects.map((project) =>{
          return(
           <Projects onClick={() => navigateToProjectTasks(project)}>
                <Name>{project.projectName}</Name>
                <Description>{project.projectDescription}</Description>
                <CreatedBy>Project Owner: {project.createdBy}</CreatedBy>
                </Projects>
          )
       })}
       </MainDiv>
       <ModalElement open = {isOpen} onClose ={() => setIsOpen(false)}>
                </ModalElement> 
       </PageWrapper>
          {/* This ul, iterates the number of pages and display each page number*/ }
          {pageNumbers.length>1?<PageNumberul>
            {pageNumbers.map((number) =>{
                return(
                    <Li
                    key = {number}
                    id = {number}
                    onClick = {(e) => handlePageClick(e)}
                    >{number}</Li>
                )
            })}
            </PageNumberul>:null}
            </>
    )
}
    else{
        return (
            <>
            <ToastContainer/>
            <NewProject>
                {adminUsers.map((adminUser) =>(
                    adminUser.email === localStorage.getItem("user")? 
                            <>
                            <CreateProjectIcon>
                        <FiPlusCircle onClick={() => setIsOpen(true)}></FiPlusCircle>
                        </CreateProjectIcon><CreateProject>Create a new project</CreateProject>
                        </>: null))}
                </NewProject>
                {/* Project modal element is opened when is open is set and its passed as props to the modalElement*/}
                <ModalElement open = {isOpen} onClose ={() => setIsOpen(false)}>
                </ModalElement> 
                </>
          );
    }
}


export default Dashboard