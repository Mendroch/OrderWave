import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 60px 0 91px 0;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 21px;
  max-width: 900px;
`;

export const Closed = styled.p`
  color: ${({ theme }) => theme.colors.red};
`;

export const BackgroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  img {
    margin-top: 19px;
    max-width: 100%;
    align-self: flex-end;
  }
`;
