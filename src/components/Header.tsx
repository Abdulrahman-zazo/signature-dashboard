import { useDispatch } from "react-redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import { useAppSelector } from "../app/store";
import { collapsedAction } from "../app/features/uiSlice/uiSlice";
import { LogoutHandler } from "./LogoutHandler";
import { useGetuserInformationQuery } from "../app/features/auth/userApi";
import { cookieService } from "../Cookies/CookiesServices";
import { BellRing, LogOut } from "lucide-react";
import { HaderFixed } from "./ExtraStyles";

const HeaderDashbord = () => {
  const dispatch = useDispatch();
  const { uiSlice } = useAppSelector((state) => state);
  const token = cookieService.get("auth_token");
  const { data } = useGetuserInformationQuery(`${token}`, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <Header
        style={{
          ...HaderFixed,
        }}
      >
        <Button
          type="text"
          icon={
            uiSlice.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
          onClick={() => dispatch(collapsedAction())}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className=" bg-red-50 text-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 "
            onClick={() => LogoutHandler()}
          >
            <LogOut size={16} />
          </button>
          <button
            type="button"
            className=" bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 "
          >
            <BellRing size={16} />
          </button>
          <div className="flex justify-center items-center gap-4">
            {/* <img
              src={data?.User.image_url}
              alt={data?.User.first_name}
              className="w-[25px] h-[25px] rounded-full object-cover"
            /> */}
            <p>
              {data?.User.first_name} {data?.User.last_name}
            </p>
            <div className="w-[30px] h-[30px] rounded-full object-cover bg-primary" />
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderDashbord;
