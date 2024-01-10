import styled from "styled-components";

export const BackStripWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
`;

export const Header = styled.p`
  margin-top: 72px;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-family: "Amarante", sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;

export const Label = styled.label`
  display: flex;
  margin: 16px 0 8px 0;
  span {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const Input = styled.input`
  padding: 12px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.m};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 70px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;
