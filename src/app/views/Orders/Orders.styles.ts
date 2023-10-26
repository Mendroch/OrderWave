import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background: ${({ theme }) => theme.colors.lightGray};
`;

export const OrderDishes = styled.div`
  padding: 21px;
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 21px;
  height: calc(100% - 193px);
  overflow-y: auto;
`;
