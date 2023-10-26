import styled from "styled-components";

interface ItemProps {
  $isactive: boolean;
}

export const Wrapper = styled.div`
  min-width: 128px;
  height: calc(100% - 60px);
  background: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
`;

export const Item = styled.div<ItemProps>`
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.darkPurple};
  background: ${(props) =>
    props.$isactive ? props.theme.colors.lightGray : props.theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};
  cursor: pointer;

  &:active {
    background: ${({ theme }) => theme.colors.lightGray};
  }
`;
