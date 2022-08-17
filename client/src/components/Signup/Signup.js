import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Headings,
  H1,
  Wrapper,
  Form,
  Names,
  FirstName,
  LastName,
  Input,
  Address1,
  Address2,
  Location,
  Email,
  Password,
  Button,
  StyledLink
} from "./SignupStyledComponent"

//shopping cart
//a route
const Signup = () => {
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const navigate = useNavigate();

    const singupFn = (e) =>{
      e.preventDefault();
      fetch(`/api/create-user`,{
        method : "POST",
        body : JSON.stringify({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        }),
        headers:{
            "Content-type" :"application/json",
        },
    })
    .then((res) => console.log(res.json()))
    .then((data) =>{
      toast.success('User registered succesfully !', {
        position: toast.POSITION.TOP_RIGHT
    });
    navigate("/signin")
    })
}

    return (
      <>
        <Headings>
          <H1>Sign up for Managefluent!</H1>
        </Headings>
        <Wrapper>
          <Form  onSubmit={(e) => singupFn(e)}>
              <FirstName>
                <Input type="text" placeholder="First Name" onChange = {(e) => setFirstName(e.target.value)}required />
              </FirstName>
              <LastName>
                <Input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
              </LastName>
            <Address1>
              <Input
                type="email"
                id="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Address1>
            <Password>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            <Address2>
              <Input
                type="text"
                id="institution"
                placeholder="Institution/Company"
                optional
              />
            </Address2>
            <Location>
              <Input
                type="text"
                id="location"
                placeholder="Location"
                optional
              />
            </Location>
     
         
            </Password>
            <Button type="submit">Sign Up</Button>
          </Form>
          <StyledLink to = "/SignIn">Already have an account? Sign in here!</StyledLink>
          <ToastContainer autoClose={1000}/>
        </Wrapper>
      </>
    );
    }
export default Signup;
