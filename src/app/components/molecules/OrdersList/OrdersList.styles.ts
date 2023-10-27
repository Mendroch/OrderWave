import styled from "styled-components";

interface ItemProps {
  $isactive: boolean;
}

export const Wrapper = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 130px;
  min-width: 128px;
  background: ${({ theme }) => theme.colors.white};
  overflow: auto;
  z-index: 1;

  @media (max-width: 426px) {
    bottom: initial;
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};
  }
`;

export const Item = styled.div<ItemProps>`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.darkPurple};
  background: ${(props) =>
    props.$isactive ? props.theme.colors.lightGray : props.theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};
  cursor: pointer;

  @media (max-width: 426px) {
    padding: 16px;
    border-right: 1px solid ${({ theme }) => theme.colors.semiLightGray};
    border-bottom: none;
  }
`;
