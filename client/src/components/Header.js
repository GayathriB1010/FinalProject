import styled, { ServerStyleSheet } from "styled-components";
import logo from "../images/TinyLogo.png";
import {FiPlusCircle} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import ModalElement from "./ModalElement";
import { ManagefluentContext } from "./ManagefluentContext";
import { useEffect } from "react";

const Header = () =>{
    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(false);
    const {currentUser,adminUsers,setAdminUsers} = useContext(ManagefluentContext);

    useEffect(() =>{
        const getAdminUsers = async() =>{
            const response = await fetch(`api/get-adminUsers`);
            const data = await response.json();
            setAdminUsers((data['data']));
            console.log(adminUsers)
        }
        if(currentUser){
            getAdminUsers();
        }
    },[currentUser]);

    return(
       <Wrapper>
           <Head>
                <LogoAndName onClick={() => navigate("/")}>
                <Img src={logo}/>
                <Name>Managefluent</Name>
                </LogoAndName>
                <NewProject>
                {adminUsers.map((adminUser) =>(
                    adminUser.userId === currentUser? 
                            <>
                            <Icon>
                        <FiPlusCircle onClick={() => setIsOpen(true)}></FiPlusCircle>
                        </Icon><CreateProject>Create a new project</CreateProject>
                <ModalElement open = {isOpen} onClose ={() => setIsOpen(false)}>
                </ModalElement> </>: null))}
                </NewProject>
           </Head>
       </Wrapper>
    )
}

const Head = styled.div`
color : black;
display:flex;
font-size:30px;
padding :1rem;
margin: 0 24px;
gap : 60%;
`
const Wrapper = styled.div`
background:#2bd4d4;
`
const Img = styled.img`
height : 5rem;
width :5rem;
`
const Name = styled.div`
color : rgba(0,144,144,1);
font: 900 2rem Montserrat;
margin-top : 10px;
`
const CreateProject = styled.div`
font-size : 20px;
margin : 10px;
`
const LogoAndName = styled.div`
display:flex;
`;

const NewProject = styled.div`
display:flex;
`

const Icon = styled.div`
margin : 10px;
`

export default Header;