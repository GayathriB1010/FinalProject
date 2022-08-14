import styled from "styled-components";
import { Link } from "react-router-dom";

// ------------------------------------------------
// Main div
export const Wrapper = styled.div`
  font-family: var(--font);
  margin: 0 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
`;
// ------------------------------------------------
// Header
export const H1 = styled.h1`
  font-size: 24px;
  padding: 15px 24px;
  font-family: var(--font);
  margin: 0 24px;   

`;
// ------------------------------------------------
// Form
export const Form = styled.form`
  box-sizing: border-box;
  border: 1px solid #E8E8E8;
  font-family: var(--font);
  margin: 0 24px;
  width:20%;
`;

export const FirstName = styled.div`
`;
export const LastName = styled.div`
`;

export const Input = styled.input`
  padding: 10px;
  width: calc(100% - 48px);
  margin: 10px 10px 10px 10px;
  font-family: var(--font);
`;
export const Address2 = styled.div`
`;
export const Address1 = styled.div``;
export const Location = styled.div``;
export const Email = styled.div``;
export const Password = styled.div``;
export const Button = styled.button`
font-family: var(--font);
  padding: 10px;
  border: none;
  background: #2bd4d4;;
  color : white;
  width : calc(100% - 20px);
  margin : 10px 10px 10px 10px;
`;

export const Headings = styled.div`
text-align:center;
`
export const StyledLink = styled(Link)`
margin: 20px 20px 10px 20px;
color : #3333ff;
font:var(--font);
font-size:1rem;
`