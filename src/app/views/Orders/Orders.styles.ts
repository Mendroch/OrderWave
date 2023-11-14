import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;

  @media (max-width: 426px) {
    flex-direction: column;
  }
`;

export const OrderDishes = styled.div`
  margin: 60px 0 129px 128px;
  padding: 21px;
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 427px) {
    margin: 116px 0 133px 0;
  }
`;
