import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 21px;
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  min-width: 230px;
  max-width: 400px;
  column-gap: 30px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;

  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme.colors.purple};
    min-width: 25px;
    min-height: 25px;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Name = styled.p`
  margin-bottom: 5px;
  font-weight: 600;
`;

export const Variant = styled.p`
  padding-left: 8px;
`;

export const Ingredient = styled.p`
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 20px;
`;
