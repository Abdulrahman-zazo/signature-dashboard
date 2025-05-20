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
import { useAppSelector } from "../../app/store";
import { Badge } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

export const ItemsComponent = () => {
  // استرداد عدد الشكاوى الجديدة من الـ Redux store
  const newComplaintsCount = useAppSelector(
    (state) => state.complaints.new_complaints
  );

  const items: MenuItem[] = [
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

    getItem(
      <NavLink to="/address">
        <TranslateText text="SideBar.Address" />
      </NavLink>,
      "sub1",
      <MapPin size={16} />
    ),
    getItem(
      <NavLink to="/complaints">
        <div className="flex items-center justify-between ">
          <TranslateText text="SideBar.Complaints" />
          {newComplaintsCount > 0 && <Badge count={newComplaintsCount} />}
        </div>
      </NavLink>,
      "9",
      <MessageCircleQuestion size={16} />
    ),
    getItem(
      <>
        <NavLink to="/users">
          <TranslateText text="SideBar.All_Users" />
        </NavLink>
      </>,
      "10",
      <Users size={16} />

      // 1- Can view All user Type
      // [
      //   getItem(
      //     <NavLink to="/admin">
      //       <TranslateText text="SideBar.Admin" />
      //     </NavLink>,
      //     "6"
      //   ),
      //   getItem(
      //     <NavLink to="/users">
      //       <TranslateText text="SideBar.Users" />
      //     </NavLink>,
      //     "8"
      //   ),
      // ]
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

  return items;
};
