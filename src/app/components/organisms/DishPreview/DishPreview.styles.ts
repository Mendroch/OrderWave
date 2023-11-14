import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: -808px;
  left: 0;
  width: 100vw;
  max-height: min(800px, 80%);
  background: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
  z-index: 6;
`;

export const Header = styled.p`
  margin-top: 16px;
  font-weight: 600;
  text-align: center;
`;

export const Button = styled.button`
  position: absolute;
  top: 29px;
  right: 21px;
  padding: 0;
  border: none;
  background: rgba(0, 0, 0, 0);

  img {
    width: 22px;
  }
`;

export const Container = styled.div`
  padding: 21px;
  margin-top: 9px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  @media (max-width: 542px) {
    grid-template-columns: 1fr;
  }
  column-gap: 21px;
`;

export const ListItem = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  column-gap: 42px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};

  img {
    width: 136px;
  }
`;

export const Title = styled.p`
  font-weight: 500px;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.veryDarkGray};
`;

export const Variants = styled.div`
  p {
    padding: 8px 0;
  }

  p:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.semiLightGray};
  }
`;
