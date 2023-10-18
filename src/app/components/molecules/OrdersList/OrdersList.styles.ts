import styled from "styled-components";

export const Wrapper = styled.div`
  width: 128px;
  height: calc(100% - 60px);
  background: ${({ theme }) => theme.colors.white};
  overflow-y: auto;

  & > div {
    padding: 12px 16px;
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ theme }) => theme.colors.darkPurple};
    background: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};
    cursor: pointer;

    &:active {
      background: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;
