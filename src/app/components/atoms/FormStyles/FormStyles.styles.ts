import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 60px 0 91px 0;
  background: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.p`
  margin-top: 21px;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-family: "Amarante";
  text-align: center;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 21px;
  max-width: 900px;
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: row;
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
    column-gap: 21px;
  }
`;

export const Label = styled.label`
  p {
    margin-bottom: 8px;
  }

  span {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const BaseInput = styled.input`
  margin-top: 8px;
  padding: 15px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.s};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
`;

export const Input = styled(BaseInput).attrs({ as: "input" })``;

export const TextArea = styled(BaseInput).attrs({ as: "textarea" })`
  resize: vertical;
`;

export const SelectInput = styled.select`
  margin-top: 8px;
  padding: 15px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.s};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
    no-repeat;
  background-position: right 8px center;
`;

export const Margin = styled.div`
  height: 41px;
`;

export const Availability = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputSubmit = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
`;