import styled from "styled-components";

export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 43px;
  height: 26px;
`;

export const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.2s;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 14px;

  &::before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-transition: 0.2s;
    transition: 0.2s;
    border-radius: 50%;
  }
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Span} {
    background-color: ${({ theme }) => theme.colors.darkPurple};
  }

  &:checked + ${Span}::before {
    -webkit-transform: translateX(17px);
    -ms-transform: translateX(17px);
    transform: translateX(17px);
  }
`;
