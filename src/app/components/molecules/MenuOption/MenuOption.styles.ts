import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface SubOptionsProps {
  $isopen?: boolean;
  $withsub?: boolean;
}

export const StyledLink = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

export const Wrapper = styled.div<SubOptionsProps>`
  position: relative;
  padding-left: 16px;
  cursor: pointer;

  & > div:first-of-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 47px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

    & > div {
      display: flex;
      align-items: center;

      img {
        height: 24px;
      }
    }

    & > img {
      transform: ${(props) => (props.$isopen ? "rotate(0)" : "rotate(180deg)")};
      margin-right: 21px;
      height: 14px;
    }

    p {
      margin-left: 8px;
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.m};
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
  }

  &:hover {
    background: ${(props) => (props.$withsub ? "transparent" : props.theme.colors.semiLightGray)};
  }
`;

export const SubOptions = styled.div<SubOptionsProps>`
  display: ${(props) => (props.$isopen ? "block" : "none")};
  padding: 8px 0 0 16px;

  button,
  a {
    padding: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 47px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};
    color: ${({ theme }) => theme.colors.black};
    background: none;
    text-decoration: none;
  }
`;
