import styled from "styled-components";

interface HourProps {
  $isCurrentDay: boolean;
}

export const ClockImage = styled.img`
  margin-right: 2px;
`;

export const Red = styled.p`
  color: ${({ theme }) => theme.colors.red};
`;

export const HoursButton = styled.button`
  margin-top: 4px;
  padding: 0;
  color: ${({ theme }) => theme.colors.darkPurple};
  text-decoration: underline;
  border: none;
  background: none;
`;

export const Hour = styled.div<HourProps>`
  margin: 0 0 10px 31px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => (props.$isCurrentDay ? "700" : "400")};

  &:first-of-type {
    margin-top: 19px;
  }
`;
