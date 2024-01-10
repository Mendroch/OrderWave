import styled from "styled-components";

export const BackStripWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
`;

export const Header = styled.p`
  margin-top: 72px;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-family: "Amarante", sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;
