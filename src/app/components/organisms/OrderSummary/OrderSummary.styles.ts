import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 32px;
  padding: 32px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
`;

export const Title = styled.p`
  padding-bottom: 16px;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const OrderItem = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  column-gap: 21px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  > div:last-of-type {
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const BoldText = styled.p`
  font-weight: 600;
  white-space: nowrap;
`;

export const DeleteButton = styled.button`
  border: none;
  background: rgba(0, 0, 0, 0);

  img {
    width: 22px;
  }
`;

export const Sum = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;
