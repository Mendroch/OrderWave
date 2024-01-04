import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 60px 0 91px 0;
  padding: 21px;
  background: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

export const Closed = styled.p`
  color: ${({ theme }) => theme.colors.red};
`;
