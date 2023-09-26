import styled from "styled-components";

interface StyledButtonProps {
  isActive: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  color: ${(props) => (props.isActive ? "white" : "gray")};
  font-size: 16px;
  background-color: ${(props) => (props.isActive ? "purple" : "gray")};
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: ${(props) => (props.isActive ? "pink" : "gray")};
  }
`;
