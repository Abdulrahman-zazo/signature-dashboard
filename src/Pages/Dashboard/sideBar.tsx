import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd/lib";
import { Link } from "react-router-dom";

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

export const items: MenuItem[] = [
  getItem(
    <Link to="/" rel="noopener noreferrer">
      Dashboard
    </Link>,
    "1",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/order" rel="noopener noreferrer">
      Order
    </Link>,
    "2",
    <DesktopOutlined />
  ),

  getItem("Address", "sub1", <UserOutlined />, [
    getItem(
      <Link to="/countries" rel="noopener noreferrer">
        Countries
      </Link>,
      "sub1-3"
    ),
    getItem(
      <Link to="/cities" rel="noopener noreferrer">
        Cities
      </Link>,
      "sub1-4"
    ),
    getItem(
      <Link to="/regions" rel="noopener noreferrer">
        Regions
      </Link>,
      "sub1-5"
    ),
  ]),
  getItem(
    <Link to="/complaints" rel="noopener noreferrer">
      Complaints
    </Link>,
    "9",
    <FileOutlined />
  ),
  getItem(
    <Link to="/users" rel="noopener noreferrer">
      All Users
    </Link>,
    "10",
    <FileOutlined />,
    [getItem("Admins", "6"), getItem("Users", "8")]
  ),
  getItem(
    <Link to="/services" rel="noopener noreferrer">
      Services
    </Link>,
    "11",
    <FileOutlined />,
    [
      getItem("Proviedors", "11-6"),
      getItem("Categories", "11-7"),
      getItem("Services Orders", "11-8"),
    ]
  ),
  getItem(
    <Link to="/settings" rel="noopener noreferrer">
      Settings
    </Link>,
    "12",
    <FileOutlined />
  ),
];
