import styled from "styled-components";

export const Wrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 32px;
  }
`;

export const Header = styled.p`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 500;
`;

export const UnAvailable = styled.div`
  margin-bottom: 16px;
  padding: 8px 11px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.s};
  background: ${({ theme }) => theme.colors.lightYellow};
  border-radius: 4px;
`;
