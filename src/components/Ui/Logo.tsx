import LogoVertical from "../../assets/logo v.png";
import LogoHorizental from "../../assets/logo h.png";

interface IProps {
  type: "v" | "h";
  width: number;
}

const Logo = ({ type = "v", width }: IProps) => {
  if (type === "v") {
    return <img src={LogoVertical} alt="Logo signature" width={width} />;
  } else return <img src={LogoHorizental} alt="Logo signature" width={width} />;
};

export default Logo;
