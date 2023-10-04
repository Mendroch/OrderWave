import styled from "styled-components";

interface StyledButtonProps {
  isActive: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 48px;
  color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.theme.colors.veryDarkGray};
  font-size: 16px;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.darkPurple : props.theme.colors.semiLightGray};
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? props.theme.colors.purple : props.theme.semiLightGray};
  }
`;
