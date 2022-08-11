import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from 'styled-components';

const LoadingWheel = () =>{
    return(
        <LoadingWheelAnimation></LoadingWheelAnimation>
    )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingWheelAnimation = styled(FiLoader)`
animation: ${rotate} 8s infinite linear;
font-size: 1.2rem;
`;

export default LoadingWheel