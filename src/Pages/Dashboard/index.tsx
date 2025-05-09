import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import type { MenuProps } from "antd/lib";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../../components/Ui/Logo";

import { useAppSelector } from "../../app/store";
import HeaderDashbord from "../../components/Header";
import { Outlet } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const siderStyle: React.CSSProperties = {
  // overflow: "auto",
  // height: "100vh",
  // position: "sticky",
  // insetInlineStart: 0,
  // top: 0,
  // bottom: 0,
  // scrollbarWidth: "thin",
  // scrollbarGutter: "stable",
};

const Dashboard = () => {
  const { collapsed } = useAppSelector((state) => state.uiSlice);

  const items: MenuItem[] = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          style={{ padding: 0, background: "#fff", ...siderStyle }}
          collapsible
          collapsed={collapsed}
        >
          <div className="flex justify-center items-center mx-auto my-4">
            {collapsed ? (
              <Logo type="icon" width={30} />
            ) : (
              <Logo type="h" width={125} />
            )}
          </div>
          <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
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
          {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
