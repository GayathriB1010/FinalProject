import styled from "styled-components";
import womanImg from "../images/computerWoman.png"
import { useNavigate } from "react-router-dom";


const Homepage = () =>{
    let navigate = useNavigate();
return(
    <Wrapper>
        <AppDesc>
            <Welcome>
                Welcome to Managefluent!
            </Welcome>
            <WelcomeMessage>
                A space where you can easily manage all your project tasks.
            </WelcomeMessage>
            <Button type ="submit" onClick={() =>navigate("/Signup")}>Sign Up</Button>
        </AppDesc>
        <ComputerWomanImage src={womanImg}>
        </ComputerWomanImage>
    </Wrapper>
)
}

const Wrapper = styled.div`
display:flex;
`
const AppDesc = styled.div`
display:flex;
flex-direction:column;
margin: 100px 100px;
`
const Welcome = styled.div`
font-size : 2rem;
margin-bottom:25px;
`
const WelcomeMessage = styled.div`
font-size:1rem;
margin-bottom:25px;
`
const Button = styled.button`
width:100px;
padding:10px;
color:#eb2d53;
border:1px solid #eb2d53;
margin-bottom:10px;
`
const ComputerWomanImage = styled.img`
`
export default Homepage;