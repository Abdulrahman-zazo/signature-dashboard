import { cookieService } from "../../Cookies/CookiesServices";

interface IProps {}

const Dashboard = ({}: IProps) => {
  const removeToken = () => {
    cookieService.remove("auth_token");
    window.location.reload();
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={removeToken}>Logout</button>
    </div>
  );
};

export default Dashboard;
