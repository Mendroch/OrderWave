import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 60px;
  padding: 21px;
  row-gap: 8px;

  & > div:not(:last-child) {
    margin-bottom: 8px;
  }
`;
