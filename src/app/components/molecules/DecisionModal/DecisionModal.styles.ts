import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  min-width: 400px;
  padding: 21px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;

  @media (max-width: 426px) {
    min-width: calc(100vw - 42px);
  }
`;

export const Header = styled.p`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 21px;
  display: flex;
  align-self: flex-end;

  button {
    padding: 0 16px;
    width: auto;
    font-weight: 500;
  }
`;

export const CancelButton = styled.button`
  margin-right: 16px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.darkPurple};
  border-radius: 4px;
`;
