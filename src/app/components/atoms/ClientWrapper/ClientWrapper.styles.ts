import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 60px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 21px 21px 21px;
  max-width: 560px;
`;
