import styled from "styled-components";
import waterImage1 from "../images/waterImage1.png"

export const Wrapper = styled.div`
`
export const MainDiv = styled.div`
height:100vh;
display:flex;
flex-wrap:wrap;
justify-content:space-evenly;
width:85%;
height:90%;
background-image:url(${waterImage1})
`
export const ProjectWrapper = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;


`
export const Projects = styled.div`
height:120px;
border : 1px solid lightgray;
margin :20px;
padding : 20px;
box-shadow : 2px 2px 2px 2px lightgray;
width:400px;
cursor:pointer;
&:hover{transform: scale(1.01)}
`

export const Description = styled.div`
color:black;
margin-top : 10px;
font-size:15px;
`
export const Name = styled.div`
color:black;
font-size :18px;
`

export const CreateProject = styled.div`
font-size : 15px;
margin : 10px;
`
export const NewProject = styled.div`
display:flex;
color:black;
margin : 0 0 20px 30px;
`

export const CreateProjectIcon = styled.div`
margin-top :10px;
font-size:15px;
cursor:pointer;
&:hover{
    color:orange;
}
`
export const PageWrapper = styled.div`
display:flex;
`

export const DashboardIcon = styled.div`
font-size : 18px;
color:#2bd4d4;
margin : 20px 0 20px 30px;
`

export const Sidebar = styled.div`
display:flex;
flex-direction:column;
width : 15%;
border-right:1px solid lightgray;
background:#f2f2f2;
height:100vh;
`
export const Span = styled.span`
margin:10px;
color:#2bd4d4;
font-size:18px;
`

export const RecentProjects = styled.div`
font-size : 18px;
color:#2bd4d4;
margin : 20px 0 0px 30px;`

export const RecentProjectDiv = styled.div`
margin : 20px 0 20px 30px;
`

export const RecentProjectItems = styled.div`
font-size : 15px;
margin-bottom:15px;
cursor:pointer;
&:hover{
    color:orange;
}
`

export const CreatedBy = styled.div`
font-size : 12px;
margin-top : 35px;
`
export const Li = styled.li`
list-style:none;
color:#2bd4d4;
cursor:pointer;
text-align: center;
border:1px solid #ddd;
display: inline-block;
width:50px;
height:20px;
color:black;
font-size:15px;
box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
background: #dde1e7;
margin: 0px 5px;
border-radius: 3px;
&:hover{transform: scale(1.1)}
`

export const PageNumberul = styled.ul`
width:200px;
position:absolute;
bottom:100px;
right:40%;
padding: 25px;
  border-radius: 3px;
`