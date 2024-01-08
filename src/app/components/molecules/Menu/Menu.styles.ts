import styled from "styled-components";

export const Header = styled.p`
  margin: 32px 0 16px 0;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 500;
`;

export const Sections = styled.div`
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  button {
    padding: 16px;
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    text-align: center;
    text-decoration: none;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.darkPurple};
    }
  }
`;
