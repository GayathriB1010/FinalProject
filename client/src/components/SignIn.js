import styled from "styled-components";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <Headings>
        <H1>Sign In!</H1>
      </Headings>
      <Wrapper>
        <Form>
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
          <Button type="submit">Sign In</Button>
        </Form>
        <StyledLink to="/SignUp">
          Don't have an account? Sign up for Managefluent!
        </StyledLink>
      </Wrapper>
    </>
  );
};

export default SignIn;

// ------------------------------------------------
// Main div
const Wrapper = styled.div`
  font-family: var(--font);
  margin: 0 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// ------------------------------------------------
// Header
const H1 = styled.h1`
  font-size: 24px;
  padding: 15px 24px;
  font-family: var(--font);
  margin: 0 24px;
`;
// ------------------------------------------------
// Form
const Form = styled.form`
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  font-family: var(--font);
  margin: 0 24px;
  width: 30%;
`;

const Email = styled.div``;
const Password = styled.div``;
const Button = styled.button`
  font-family: var(--font);
  padding: 10px;
  border: none;
  margin: 10px 0 0 10px;
  background: #ffa500;
  &:hover {
    color: white;
  }
  width: 100%;
`;

const Headings = styled.div`
  text-align: center;
`;
const StyledLink = styled(Link)`
  margin: 10px 20px 10px 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: calc(100% - 40px);
  margin: 10px 20px 10px 20px;
  font-family: var(--font);
`;