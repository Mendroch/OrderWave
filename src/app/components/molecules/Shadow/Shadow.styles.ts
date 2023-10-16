import styled from "styled-components";
import { motion } from "framer-motion";

interface WrapperProps {
  $isdisplayed: boolean;
}

export const Wrapper = styled(motion.div)<WrapperProps>`
  display: ${(props) => (props.$isdisplayed ? "block" : "none")};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.shadow};
`;
