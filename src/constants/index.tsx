// Icons

import { MdBrandingWatermark, MdCategory } from "react-icons/md";
import Categories from "../pages/categories/Categories";
import Brands from "../pages/brands/Brands";
import Users from "../pages/users/Users";
import { FaUser } from "react-icons/fa";

export const DashBoardLinks = [
  {
    path: "/categories",
    label: "الأقسام",
    icon: <MdCategory />,
    childComponente: <Categories />,
  },
  {
    path: "/brands",
    label: "الماركات",
    icon: <MdBrandingWatermark />,
    childComponente: <Brands />,
  },
    {
    path: "/users",
    label: "المستخدمين",
    icon: <FaUser />,
    childComponente: <Users />,
  },

];
