import styled from "styled-components";

export const Header = styled.div`
  padding: 24px 0 49px 0;
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: 500;
  line-height: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  > p:first-of-type {
    color: ${({ theme }) => theme.colors.darkPurple};
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

export const Wrapper = styled.div`
  margin-top: 41px;
`;

export const Title = styled.div`
  margin-bottom: 33px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;

export const Required = styled.p`
  color: ${({ theme }) => theme.colors.ateneoBlue};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 400;
`;
