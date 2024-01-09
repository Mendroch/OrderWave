import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.div`
  padding: 24px 0 49px 0;
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: 500;
  line-height: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  > p:first-of-type {
    color: ${({ theme }) => theme.colors.darkPurple};
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

export const Wrapper = styled.div`
  margin-top: 41px;
`;

export const Title = styled.div`
  margin-bottom: 33px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.ateneoBlue};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 400;
`;

export const ActionWrapper = styled.div`
  display: flex;
  column-gap: 16px;
`;

export const ArrowRight = styled.img`
  margin-left: 8px;
  width: 17px;
`;

export const BackButton = styled(NavLink)`
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
