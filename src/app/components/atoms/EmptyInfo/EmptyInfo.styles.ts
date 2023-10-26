import styled from "styled-components";

export const EmptyInfo = styled.p`
  padding: 0 21px 55px 21px;
  align-self: center;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.veryDarkGray};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 500;
`;
