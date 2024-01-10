import styled from "styled-components";

export const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 21px;
  width: 100%;
`;

export const FormHeader = styled.div`
  margin: 51px 0 21px 0;
  display: flex;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: ${({ theme }) => theme.fontSize.xl};

  span {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const Circle = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.colors.darkPurple};
  border-radius: 50%;
`;
