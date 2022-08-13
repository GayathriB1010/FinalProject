import { useContext, useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"
import LoadingWheel from "./LoadingScreen";
import { ManagefluentContext } from "./ManagefluentContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TaskModal from "./TaskModal";

const ProjectTaskBoard = () =>{
    const {todoTasks,setTodoTasks,inProgressTasks,setInProgressTasks,doneTasks,setDoneTasks,currentUser,name,setName,updateTodo,setUpdateTodo,taskClicked,setTaskClicked} = useContext(ManagefluentContext);
    const projectId = useParams().id;
    const [isOpen,setIsOpen] = useState(false);

    useEffect(() =>{
        const getAllTodoTasks = async() =>{
            const response = await fetch(`/api/project/${projectId}/todo`);
            const data = await response.json();
            setTodoTasks(data.data)
        }
        if(localStorage.getItem("user")){
            getAllTodoTasks();
        }
    },[updateTodo]);

    const newTask = (e) =>{
        setName(e.target.value);
    }

    const addnewTask = (e) =>{
        fetch(`/api/project/${projectId}/add-task`,{
            method : "POST",
            body : JSON.stringify({
                name : name,
            }),
            headers:{
                "Content-type" :"application/json",
            },
        })
        .then((res) => res.json())
        .then((data) =>{
            setUpdateTodo(!updateTodo);
        })
    }

    const TaskClickFn = () =>{
        setIsOpen(true);
        setTaskClicked(!taskClicked)
    }

    return(
        <MainDiv>
            <Todo>
            <Head>To do</Head>
                <NewTask>
                <TaskDescription onChange={(e) => newTask(e)}></TaskDescription>
                <AddTask type="button" onClick={(e) => addnewTask(e)}>Add task</AddTask>
                </NewTask>
                {todoTasks!==[] ? todoTasks.map((todoTask) =>{
                    return <TodoTask onClick={() => TaskClickFn()}>{todoTask.name}</TodoTask>
                }):<LoadingWheel></LoadingWheel>}
            </Todo>
            <InProgress>
                <Head>In Progress</Head>
            </InProgress>
            <Done>
                <Head>Done</Head>
            </Done>
            <TaskModal open = {isOpen} onClose ={() => setIsOpen(false)} >
                </TaskModal>
        </MainDiv>
    )
}


const MainDiv = styled.div`
display:flex;
margin-left:5%;
margin-top : 10px;
gap:20px;
`

const Todo = styled.div`
border:1px solid gray;
height:100vh;
width:30%`;

const InProgress = styled.div`
border:1px solid gray;
width:30%;`

const Done = styled.div`
border:1px solid gray;
width:30%;`

const NewTask = styled.div`
height : 20vh;
border : 1px solid gray;
margin : 10px;
display:flex;
flex-direction:column;
font-family: var(--font);
`;

const Head = styled.h3`
margin:10px;`

const AddTask = styled.button`
position : relative;
padding : 10px;
width : 30%;
margin : 10px;
`
const TaskDescription = styled.textarea`
margin : 10px;
height : 50%;
`
const TodoTask = styled.div`
margin : 10px;
height : 5vh;
border : 1px solid lightgray;
padding : 10px;
`
export default ProjectTaskBoard