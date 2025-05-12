import LogoVertical from "../../assets/logo v.png";
import LogoHorizental from "../../assets/logo h.png";
import Logoicon from "../../assets/Logoicon.png";
import LogoSidebar from "../../assets/LogosideBar.png";

interface IProps {
  type: "v" | "h" | "icon" | "sidebar";
  width: number;
}

const Logo = ({ type = "v", width }: IProps) => {
  // if (type === "v") {
  //   return <img src={LogoVertical} alt="Logo signature" width={width} />;
  // } else if (type === "h") {
  //   return <img src={LogoHorizental} alt="Logo signature" width={width} />;
  // } else {
  // }
  switch (type) {
    case "v":
      return (
        <img
          src={LogoVertical}
          alt="Logo signature"
          width={width}
          className=""
        />
      );
    case "h":
      return (
        <img
          src={LogoHorizental}
          alt="Logo signature"
          width={width}
          className=""
        />
      );
    case "icon":
      return (
        <img src={Logoicon} alt="Logo signature" width={width} className="" />
      );
    case "sidebar":
      return (
        <img
          src={LogoSidebar}
          alt="Logo signature"
          width={width}
          className=""
        />
      );
  }
};

export default Logo;
