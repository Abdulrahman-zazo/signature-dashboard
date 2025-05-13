import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import Logo from "../../components/Ui/Logo";

import { useAppSelector } from "../../app/store";
import HeaderDashbord from "../../components/Header";
import { Outlet } from "react-router-dom";
import { items } from "./sideBar";
import { siderStyle } from "../../components/ExtraStyles";

const Dashboard = () => {
  const { collapsed } = useAppSelector((state) => state.uiSlice);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          style={{
            padding: 0,
            background: "#fff",
            ...siderStyle,
          }}
          collapsible
          collapsed={collapsed}
        >
          <div className="flex justify-center items-center mx-auto my-4">
            {collapsed ? (
              <Logo type="icon" width={30} />
            ) : (
              <Logo type="sidebar" width={120} />
            )}
          </div>
          <Menu mode="inline" items={items} />
        </Sider>
        <Layout>
          <HeaderDashbord />
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                margin: "20px 4px",
                padding: 24,
                minHeight: 360,
                background: "#fefefe",
                borderRadius: 4,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
