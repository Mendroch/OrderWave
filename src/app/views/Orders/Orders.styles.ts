import styled from "styled-components";

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.lightGray};

  img {
    height: 20px;

    &:last-of-type {
      height: 18px;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.darkPurple};
    font-size: ${({ theme }) => theme.fontSize.l};
    text-decoration: underline;
  }
`;
