import styled, { ServerStyleSheet } from "styled-components";
import logo from "../images/TinyLogo.png";
import { useNavigate } from "react-router-dom";
import {FiLogOut} from "react-icons/fi";
import { ManagefluentContext } from "./ManagefluentContext";
import { useContext } from "react";

const Header = () =>{
    const {currentUser,setCurrentUser} = useContext(ManagefluentContext);
    const navigate = useNavigate();

    //This method will logout when logout button is clicked
    const logout = () =>{
        navigate("/")
        setCurrentUser("");
        localStorage.setItem("user","")
    }
    
    //This method will navigate to the dashboard
    const navigateToDashboard = () =>{
    if(localStorage.getItem("user")){
        navigate("/dashboard")
    }
    }

    return(
        <>
       <Wrapper>
           <Head>
                <LogoAndName onClick={() => navigateToDashboard()}>
                <Img src={logo}/>
                <Name>Managefluent</Name>
                </LogoAndName>
                {currentUser?<LogoutDiv><FiLogOut onClick={logout}></FiLogOut></LogoutDiv>:null}
           </Head>
       </Wrapper>
                </>
    )
}

const Head = styled.div`
color : black;
display:flex;
font-size:30px;
`
const Wrapper = styled.div`
background:#2bd4d4;
`
const Img = styled.img`
height : 5rem;
width :5rem;
margin:10px 0 0 10px;
`
const Name = styled.div`
color : rgba(0,144,144,1);
font: 900 2rem Verdana, Geneva, Tahoma, sans-serif;
margin-top:20px;
color:white;
`
const LogoAndName = styled.div`
display:flex;
`;

const LogoutDiv = styled.div`
position:absolute;
right:30px;
margin-top:25px;
color:white;
`
export default Header;