import styled from "styled-components";

export const Wrapper = styled.label`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 60px;
  line-height: 22px;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
  }

  input {
    margin-right: 16px;
    width: 20px;
    height: 20px;
    accent-color: ${({ theme }) => theme.colors.purple};
  }

  div:first-of-type {
    display: flex;
    justify-content: space-between;
    width: 100%;
    column-gap: 21px;
  }
`;

export const Line = styled.div`
  position: absolute;
  width: calc(100% - 16px);
  bottom: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};
`;
