import styled from "styled-components";
import { Wrapper } from "../../atoms/PreviewStyles/PreviewStyles.styles";

export const ShoppingWrapper = styled(Wrapper)`
  height: min(800px, 80%);
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 21px 21px 21px;
  width: 100%;
  max-width: 560px;
`;

export const ClearButton = styled.button`
  position: absolute;
  top: 29px;
  left: 21px;
  padding: 0;
  border: none;
  background: rgba(0, 0, 0, 0);

  img {
    width: 22px;
  }
`;

export const CartItem = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 21px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  &:first-of-type {
    margin-top: 46px;
  }
`;

export const Price = styled.p`
  margin: 4px 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 600;
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  column-gap: 11px;

  button {
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.darkPurple};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.darkPurple};
    border-radius: 50%;
  }
`;
