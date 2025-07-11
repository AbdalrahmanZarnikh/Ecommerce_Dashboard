// Icons

import { MdBrandingWatermark, MdCategory } from "react-icons/md";
import Categories from "../pages/categories/Categories";
import Brands from "../pages/brands/Brands";
import Users from "../pages/users/Users";
import { FaUser } from "react-icons/fa";
import Products from "../pages/products/Products";
import Orders from "../pages/orders/Orders";
import Coupons from "../pages/coupons/Coupons";

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
  {
    path: "/products",
    label: "المنتجات",
    icon: <FaUser />,
    childComponente: <Products />,
  },
  {
    path: "/orders",
    label: "الطلبات",
    icon: <FaUser />,
    childComponente: <Orders />,
  },
    {
    path: "/coupons",
    label: "كود الخصم",
    icon: <FaUser />,
    childComponente: <Coupons />,
  },

];
