import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;

  img {
    width: 24px;
  }

  & > div {
    display: flex;
    column-gap: 8px;
    margin-left: 21px;
  }
`;

export const Button = styled.button`
  padding: 0;
  border: none;
  background: ${({ theme }) => theme.colors.white};
`;
