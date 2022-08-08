import styled, { ServerStyleSheet } from "styled-components";
import logo from "../images/logo.jpg"

const Header = () =>{
    return(
       <Wrapper>
           <Head>
                <Img src={logo}/>
                <Name>Managefluent</Name>
           </Head>
       </Wrapper>
    )
}

const Head = styled.div`
background:White;
display:flex;
font-size:30px;
padding :1rem;
margin: 0 24px;
`
const Wrapper = styled.div`
`
const Img = styled.img`
height : 3rem;
width :3rem;
`
const Name = styled.div`
color : blue;
font: 900 2rem Montserrat;
text-shadow: 0 10px 25px yellow;
`
export default Header;