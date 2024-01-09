import styled from "styled-components";
import { NavLink } from "react-router-dom";

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

export const ActionWrapper = styled.div`
  display: flex;
  column-gap: 16px;
`;

export const ArrowRight = styled.img`
  margin-left: 8px;
  width: 17px;
`;

export const LeftButton = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  border: 2px solid ${({ theme }) => theme.colors.darkPurple};
  border-radius: 4px;

  img {
    width: 32px;
  }
`;
