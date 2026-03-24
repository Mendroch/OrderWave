import styled from "styled-components";
import { motion } from "framer-motion";

export const Header = styled.p`
  margin-top: 21px;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-family: "Amarante", sans-serif;
  font-size: 19px;
  margin-bottom: 16px;
`;

export const Subtitle = styled.p`
  margin-bottom: 21px;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

export const NumberCard = styled.div`
  margin: 0 auto 21px;
  max-width: 600px;
  width: 100%;
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 21px 16px;
  text-align: center;
  border-radius: 8px;
`;

export const NumberText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkPurple};
  font-size: 72px;
  font-weight: 700;
`;

export const NoticeCard = styled.div`
  max-width: 685px;
  margin: 0 auto 21px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.lightYellow};
  border: 1px solid ${({ theme }) => theme.colors.semiLightGray};
  border-radius: 8px;
`;

export const NoticeText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.5;
`;

export const DetailsCard = styled.section`
  max-width: 685px;
  margin: 0 auto 84px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
`;

export const DetailsTitle = styled.h2`
  margin: 0 0 16px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkPurple};
`;

export const DetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.veryDarkGray};
`;

export const Bold = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkPurple};
`;

export const DishesList = styled.ul`
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
`;

export const DishItem = styled.li`
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
`;

export const DetailsSection = styled.div`
  padding: 16px 0;
`;

export const DetailsDivider = styled.hr`
  margin: 0;
  border: 0.5px solid ${({ theme }) => theme.colors.gray};
`;

export const NewOrderButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  right: 21px;
  bottom: 21px;
  z-index: 20;
  background: ${({ theme }) => theme.colors.darkPurple};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 40px;
  padding: 16px 21px;
  font-weight: 700;
  cursor: pointer;
  display: ${({ $isOpen }) => ($isOpen ? "none" : "inline-flex")};
`;

export const ActionSheet = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  box-shadow: 0 -8px 16px rgba(0, 0, 0, 0.08);
  z-index: 15;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

export const SheetActionButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 16px;
  text-align: center;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.darkPurple};
  cursor: pointer;

  &:first-of-type {
    background: ${({ theme }) => theme.colors.lightGray};
  }

  &:last-of-type {
    background: ${({ theme }) => theme.colors.white};
  }
`;

export const SheetDivider = styled.hr`
  margin: 0;
  border: 0.5px solid ${({ theme }) => theme.colors.semiLightGray};
  display: none;
`;
