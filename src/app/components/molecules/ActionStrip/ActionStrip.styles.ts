import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 21px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.semiLightGray};
  border-left: 1px solid ${({ theme }) => theme.colors.semiLightGray};
`;

export const DeliverMethod = styled.p`
  margin-bottom: 21px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darkPurple};
`;
