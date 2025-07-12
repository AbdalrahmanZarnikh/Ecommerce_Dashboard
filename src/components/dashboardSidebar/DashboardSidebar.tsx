
import { Link } from "react-router-dom";

import { DashBoardLinks } from "../../constants/index";
import { useState } from "react";

const DashboardSidebar = () => {
  const [selectLink, setselectLink] = useState("categories");
  return (
    <>
      <Link to="/categories" className="flex items-center font-semibold">
        <span className="hidden lg:block text-3xl  mx-auto bg-orange-700 text-white p-4 w-full text-center ">لوحة التحكم</span>
      </Link>
      <ul className="mt-10 flex items-center justify-center flex-col lg:items-start p-5">
        {DashBoardLinks.map((item, index) => {
          if (item.path == "login" || item.path == "register") {
            return;
          }
          return (
            <Link
              key={index}
              onClick={() => setselectLink(item.path)}
              className={`flex items-center w-full p-2 rounded-md text-xl mb-3 lg:border-b
                 border-gray-300 hover:border-yellow-200 hover:bg-orange-700  hover:text-white transition-all duration-200
                 ${
                   item.path == selectLink
                     ? "bg-orange-700 text-white"
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
