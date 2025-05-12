import type { MenuProps } from "antd/lib";
import { NavLink } from "react-router-dom";
import {
  HousePlus,
  LayoutDashboard,
  MapPin,
  MessageCircleQuestion,
  Settings,
  Users,
} from "lucide-react";
import { GrBusinessService } from "react-icons/gr";
import TranslateText from "../../components/Translate";

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
    <NavLink to="/">
      <TranslateText text="SideBar.Dashboard" />
    </NavLink>,
    "1",
    <LayoutDashboard size={16} />
  ),
  getItem(
    <NavLink to="/order">
      <TranslateText text="SideBar.Order" />
    </NavLink>,
    "2",
    <HousePlus size={16} />
  ),

  getItem("Address", "sub1", <MapPin size={16} />, [
    getItem(
      <NavLink to="/countries">
        <TranslateText text="SideBar.Countries" />
      </NavLink>,
      "sub1-3"
    ),
    getItem(
      <NavLink to="/cities">
        <TranslateText text="SideBar.Cities" />
      </NavLink>,
      "sub1-4"
    ),
    getItem(
      <NavLink to="/regions">
        <TranslateText text="SideBar.Regions" />
      </NavLink>,
      "sub1-5"
    ),
  ]),
  getItem(
    <NavLink to="/complaints">
      <TranslateText text="SideBar.Complaints" />
    </NavLink>,
    "9",
    <MessageCircleQuestion size={16} />
  ),
  getItem(
    <>
      <TranslateText text="SideBar.All_Users" />
    </>,
    "10",
    <Users size={16} />,
    [
      getItem(
        <NavLink to="/users">
          <TranslateText text="SideBar.Admin" />
        </NavLink>,
        "6"
      ),
      getItem(
        <NavLink to="/admin">
          <TranslateText text="SideBar.Users" />
        </NavLink>,
        "8"
      ),
    ]
  ),
  getItem(
    <>
      <TranslateText text="SideBar.Services" />
    </>,
    "11",
    <GrBusinessService size={16} />,
    [
      getItem(
        <NavLink to="/proviedors">
          <TranslateText text="SideBar.Proviedors" />
        </NavLink>,
        "11-6"
      ),
      getItem(
        <NavLink to="/categories">
          <TranslateText text="SideBar.Categories" />
        </NavLink>,
        "11-7"
      ),
      getItem(
        <NavLink to="/Proviedors-Orders-services">
          <TranslateText text="SideBar.Proviedors_Orders" />
        </NavLink>,
        "11-8"
      ),
    ]
  ),
  getItem(
    <NavLink to="/settings">
      <TranslateText text="SideBar.Settings" />
    </NavLink>,
    "12",
    <Settings size={16} />
  ),
];
