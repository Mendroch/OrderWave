import styled from "styled-components";
import { motion } from "framer-motion";

export const Menu = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: -304px;
  width: 304px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 6;
`;

export const TopBar = styled.div`
  margin-bottom: 8px;
  padding-right: 4px;
  display: flex;
  align-items: center;
  justify-content: right;
  height: 55px;
  box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.colors.shadow};
`;
