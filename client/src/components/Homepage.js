import styled from "styled-components";
import womanImg from "../images/computerWoman.png"
import { useNavigate } from "react-router-dom";
import checklist from "../images/checklist.png";
import completed from  "../images/completed.png";
import workflow from "../images/workflow.png";


const Homepage = () =>{
    let navigate = useNavigate();
return(
    <MainDiv>
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
        <CheckListImg src = {checklist}/>
    </Wrapper>
    <Managefluent>
    <ComputerWomanImage src={womanImg}>
        </ComputerWomanImage>
    <Description>
        <DescriptionHead>What can Managefluent do?</DescriptionHead>
        <Descriptionbody>
            Managefluent is reimaging how project management can be done. By streamlining the process and giving you a place to keep track of all your projects, you no longer need to go anywhere else to keep track of your work.<br/><br/>
        I. Create a Project<br/>
        II. Add Tasks.<br/>
        III. Get projects done.
        </Descriptionbody>
    </Description>
    </Managefluent>
        </MainDiv>
)
}

//Main div
const Wrapper = styled.div`
display:flex;

`
//Description of what the application is
const AppDesc = styled.div`
display:flex;
flex-direction:column;
margin: 100px 100px;
`

//Welcome div
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
margin-bottom:10px;
color:white;
background:none;
border:1px solid white;
border-radius : 25px;
font-family: 'Montserrat', sans-serif;
`
const ComputerWomanImage = styled.img`
margin-left : 100px;
`
const Workflow = styled.img`
`;
const CheckList = styled.img``;
const Completed = styled.img``;

const Images = styled.div`
display :flex;
margin-left : 20px;
`
const MainDiv = styled.div`
background: linear-gradient(90deg, rgba(0,82,82,1) 0%, rgba(0,144,144,1) 74%);
color : white;
`
const Managefluent = styled.div`
display : flex;
`
const Description = styled.div`
margin : 100px 100px;
`
const DescriptionHead = styled.div`
font-size : 2rem;
`
const Descriptionbody = styled.div`
margin : 10px;
`

const CheckListImg = styled.img`
margin-left : 100px;
`

export default Homepage;