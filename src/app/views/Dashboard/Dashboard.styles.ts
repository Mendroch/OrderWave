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
