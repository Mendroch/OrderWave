import { useNavigate } from "react-router-dom";
import { Wrapper } from "./BackStrip.styles";
import arrowLeft from "../../../assets/icons/arrowLeft.png";

interface BackStripProps {
  title: string;
}

const BackStrip = ({ title }: BackStripProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <button onClick={() => navigate(-1)}>
        <img src={arrowLeft} alt="arrow left" />
        <p>{title}</p>
      </button>
    </Wrapper>
  );
};

export default BackStrip;
