import styled from "styled-components";

interface StyledButtonProps {
  $isactive: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 48px;
  color: ${(props) =>
    props.$isactive ? props.theme.colors.white : props.theme.colors.veryDarkGray};
  font-size: 16px;
  background-color: ${(props) =>
    props.$isactive ? props.theme.colors.darkPurple : props.theme.colors.semiLightGray};
  border-radius: 4px;
  border: none;

  &:hover {
    cursor: ${(props) => (props.$isactive ? "pointer" : "default")};
    background-color: ${(props) =>
      props.$isactive ? props.theme.colors.purple : props.theme.semiLightGray};
  }
`;
