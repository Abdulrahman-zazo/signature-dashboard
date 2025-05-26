import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

import Logo from "../../components/Ui/Logo";

import { useAppSelector } from "../../app/store";
import HeaderDashbord from "../../components/Header";
import { Outlet } from "react-router-dom";

import { siderStyle } from "../../components/ExtraStyles";
import { ItemsComponent } from "./sideBar";
import { useDispatch } from "react-redux";
import { collapsedAction } from "../../app/features/uiSlice/uiSlice";

const Dashboard = () => {
  const { collapsed } = useAppSelector((state) => state.uiSlice);
  const dispatch = useDispatch();
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
          onCollapse={() => dispatch(collapsedAction())} // <-- لتحديث الحالة عند الانهيار تلقائيًا
          breakpoint="lg" // 💡 يمكن تغييره إلى md, sm حسب الحاجة
          collapsedWidth="0" // ⬅️ اجعله يختفي تمامًا على الشاشات الصغيرة
        >
          <div className="flex items-center justify-center mx-auto my-4">
            {collapsed ? (
              <Logo type="icon" width={30} />
            ) : (
              <Logo type="sidebar" width={120} />
            )}
          </div>
          <Menu mode="inline" items={ItemsComponent()} />
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
