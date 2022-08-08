import { Link } from "react-router-dom";
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
    return (
      <>
        <Headings>
          <H1>Sign up for Managefluent!</H1>
        </Headings>
        <Wrapper>
          <Form>
              <FirstName>
                <Input type="text" placeholder="First Name" required />
              </FirstName>
              <LastName>
                <Input type="text" placeholder="Last Name" required />
              </LastName>
            <Address1>
              <Input
                type="email"
                id="email"
                placeholder="Email Address"
                required
              />
            </Address1>

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
            <Email>
              <Input
                type="email"
                id="email"
                placeholder="Email Address"
                optional
              />
            </Email>
            <Password>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                optional
              />
            </Password>
            <Button type="submit">Sign Up</Button>
          </Form>
          <StyledLink to = "/SignIn">Already have an account? Sign in here!</StyledLink>
        </Wrapper>
      </>
    );
    }
export default Signup;
