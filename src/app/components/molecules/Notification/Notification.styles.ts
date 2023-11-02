import styled from "styled-components";
import { motion } from "framer-motion";

interface WrapperProps {
  $issuccess: boolean;
}

export const Wrapper = styled(motion.div)<WrapperProps>`
  padding: 21px;
  position: fixed;
  top: 120px;
  right: -280px;
  font-weight: 500;
  background: ${(props) =>
    props.$issuccess ? props.theme.colors.lightGreen : props.theme.colors.lightRed};
  border-radius: 4px 0 0 4px;
  border-left: 3px solid
    ${(props) => (props.$issuccess ? props.theme.colors.green : props.theme.colors.red)};
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    width: 31px;
    height: 31px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-radius: 50%;
  }
`;

export const Icon = styled.img`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
`;
