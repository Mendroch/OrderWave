import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 4px;
  padding-left: 21px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 22px;
`;
