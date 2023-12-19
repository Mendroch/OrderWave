import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  button {
    padding: 0;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    border: none;

    img {
      margin-right: 8px;
      width: 16px;
    }
  }
`;
