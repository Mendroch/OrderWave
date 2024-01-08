import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 17px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;

  > div:last-of-type {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 8px;

    > img {
      border-radius: 4px;

      @media (max-width: 364px) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
`;

export const Name = styled.p`
  margin-bottom: 12px;
  font-weight: 600;
  line-height: 22px;
`;

export const Description = styled.p`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 20px;
`;

export const Button = styled.button`
  min-width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url("../../../../../src/app/assets/icons/pluspurple.svg");
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.darkPurple};

  &:hover,
  &:active {
    border: none;
    background-image: url("../../../../../src/app/assets/icons/pluswhite.svg");
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.darkPurple};
  }
`;

export const PriceAndButton = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const Allergens = styled.div`
  display: flex;
  column-gap: 8px;

  p {
    padding: 4px 6px;
    color: ${({ theme }) => theme.colors.darkGray};
    background: ${({ theme }) => theme.colors.lightGray};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const UnAvailable = styled.p`
  padding: 4px 6px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  text-align: center;
  background: ${({ theme }) => theme.colors.lightYellow};
`;
