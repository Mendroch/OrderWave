import styled from "styled-components";

export const Background = styled.img`
  width: 100%;
`;

export const RestaurantName = styled.p`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-family: "Amarante", sans-serif;
`;

export const CartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.darkPurple};
  border-radius: 4px;

  img {
    width: 32px;
  }
`;
