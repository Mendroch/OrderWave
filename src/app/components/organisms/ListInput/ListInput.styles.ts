import styled from "styled-components";

export const AddButton = styled.div`
  margin: 8px 0;
  padding: 15px;
  color: ${({ theme }) => theme.colors.darkPurple};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
`;

export const InputsWrapper = styled.div`
  display: flex;
  column-gap: 8px;

  input:nth-of-type(2) {
    width: 130px;
  }
`;

export const List = styled.div`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  img {
    width: 24px;
    cursor: pointer;
  }
`;
