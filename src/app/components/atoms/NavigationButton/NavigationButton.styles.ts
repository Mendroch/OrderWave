import styled from "styled-components";

export const NavigationButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }

  img {
    margin-top: 4px;
    height: 16px;
  }
`;
