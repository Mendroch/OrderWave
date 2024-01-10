import styled from "styled-components";

interface LabelProps {
  $checked: boolean;
}

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label<LabelProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.colors.lightPurple};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${(props) => (props.$checked ? "700" : "400")};
  border: ${(props) => (props.$checked ? `2px solid ${props.theme.colors.purple}` : "none")};
  border-radius: 5px;

  img {
    margin-bottom: 12px;
    width: 48px;
  }
`;

export const TableNumber = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.xs};
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    appearance: textfield;
  }

  span {
    color: ${({ theme }) => theme.colors.red};
  }

  input {
    margin-top: 2px;
    padding: 12px;
    width: 111px;
    font-size: ${({ theme }) => theme.fontSize.m};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
  }
`;
