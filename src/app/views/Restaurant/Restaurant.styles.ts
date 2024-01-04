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
