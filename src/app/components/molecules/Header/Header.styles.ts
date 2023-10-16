import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  img {
    height: 20px;
  }

  p {
    color: ${({ theme }) => theme.colors.darkPurple};
    font-size: ${({ theme }) => theme.fontSize.l};
    text-decoration: underline;
  }
`;
