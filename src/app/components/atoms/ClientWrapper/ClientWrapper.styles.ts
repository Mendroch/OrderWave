import styled from "styled-components";

interface WrapperProps {
  $withPadding: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  padding-top: 60px;
  padding-bottom: ${(props) => (props.$withPadding ? "90px" : "0")};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 21px 21px 21px;
  max-width: 560px;
`;
