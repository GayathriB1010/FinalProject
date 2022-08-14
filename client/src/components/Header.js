import styled, { ServerStyleSheet } from "styled-components";
import logo from "../images/TinyLogo.png";
import { useNavigate } from "react-router-dom";

const Header = () =>{
    const navigate = useNavigate();

    return(
        <>
       <Wrapper>
           <Head>
                <LogoAndName onClick={() => navigate("/dashboard")}>
                <Img src={logo}/>
                <Name>Managefluent</Name>
                </LogoAndName>
             
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

export default Header;