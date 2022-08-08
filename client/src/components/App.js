import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import SignIn from "./SignIn";
import Signup from "./Signup/Signup";
import Dashboard from "./Dashboard";
import ProjectTaskBoard from "./ProjectTaskBoard";
import Task from "./Task";
import Header from "./Header";
import Homepage from "./Homepage";

const App = () =>{
    return(
        <BrowserRouter>
            <GlobalStyles/>
            <Header/>
            <Main>
                <Routes>
                    <Route exact path = "/signup" element = {<Signup/>}/>
                    <Route exact path = "/" element = {<Homepage/>}/>
                    <Route exact path = "/signIn" element = {<SignIn/>}/>
                    <Route exact path="/dashboard" element ={<Dashboard/>} />
                    <Route exact path = "/project/:id" element={<ProjectTaskBoard/>} />
                    <Route exact path = "/task/:id" element={<Task/>}/>
                </Routes>
            </Main>
        </BrowserRouter>
    )
}

const Main = styled.div`
`

export default App