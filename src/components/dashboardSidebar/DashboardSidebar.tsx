import { CgMenuGridR } from "react-icons/cg";

import { Link } from "react-router-dom";

import { DashBoardLinks } from "../../constants/index";
import { useState } from "react";

const DashboardSidebar = () => {
  const [selectLink, setselectLink] = useState("benefits");
  return (
    <>
      <Link to="/categories" className="flex items-center font-semibold">
        <CgMenuGridR className="text-3xl text-black me-1" />
        <span className="hidden lg:block text-3xl text-black">Dashboard</span>
      </Link>
      <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
        {DashBoardLinks.map((item, index) => {
          if (item.path == "login" || item.path == "register") {
            return;
          }
          return (
            <Link
              key={index}
              onClick={() => setselectLink(item.path)}
              className={`flex items-center w-full p-2 rounded-md text-xl mb-3 lg:border-b
                 border-gray-300 hover:border-yellow-200 hover:bg-Orange_70 hover:text-black transition
                 ${
                   item.path == selectLink
                     ? "bg-Orange_70 text-black"
                     : "bg-Orange_85 "
                 }
                 `}
              to={item.path}
            >
              <div className="me-2">{item.icon}</div>
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default DashboardSidebar;
