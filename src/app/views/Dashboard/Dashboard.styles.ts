import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 21px;
  max-width: ${({ theme }) => theme.width.dashboardContainer};

  @media (min-width: 425px) {
    height: 100vh;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  font-family: "Amarante", sans-serif;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: ${({ theme }) => theme.fontSize.xxl};

  img {
    margin-right: 3px;
    width: 32px;
  }

  @media (max-width: 425px) {
    font-size: ${({ theme }) => theme.fontSize.xl};

    img {
      margin-right: 2px;
      width: 24px;
    }
  }
`;

export const Paragraph = styled.p`
  margin-top: 44px;
  color: ${({ theme }) => theme.colors.darkGray};
  text-align: center;
  line-height: 27px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 106px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Link = styled(NavLink)`
  padding: 24px 0;
  width: 345px;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  font-family: "Amarante", sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-decoration: none;
  text-align: center;
  border-radius: 5px;

  @media (max-width: 425px) {
    width: 100%;
    padding: 24px 0;
  }
`;
