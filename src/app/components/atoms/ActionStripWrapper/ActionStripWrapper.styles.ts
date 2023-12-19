import styled from "styled-components";

export const ActionStripWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 21px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.semiLightGray};
  border-left: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  a {
    text-decoration: none;
  }
`;