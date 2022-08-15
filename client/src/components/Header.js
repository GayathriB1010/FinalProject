import styled, { ServerStyleSheet } from "styled-components";
import logo from "../images/TinyLogo.png";
import { useNavigate } from "react-router-dom";
import {FiLogOut} from "react-icons/fi";

const Header = () =>{
    const navigate = useNavigate();
    const logout = () =>{
        navigate("/")
        localStorage.setItem("user","")
    }

    return(
        <>
       <Wrapper>
           <Head>
                <LogoAndName onClick={() => navigate("/dashboard")}>
                <Img src={logo}/>
                <Name>Managefluent</Name>
                </LogoAndName>
                <LogoutDiv><FiLogOut onClick={logout}></FiLogOut></LogoutDiv>
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