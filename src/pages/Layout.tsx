import { Outlet } from "react-router-dom";
import DashboardNav from "../components/dashboardNav/DashboardNav";
import DashboardSidebar from "../components/dashboardSidebar/DashboardSidebar";
import { Toaster } from "react-hot-toast";

const DashBoardLayout = () => {
  return (
    <>
      <DashboardNav />
      <Toaster />
      <div className="overflow-height flex items-start justify-between overflow-hidden">
        <div className="overflow-height  lg:w-2/12 hidden sm:block bg-orange-300 text-black ">
          <DashboardSidebar />
        </div>
        <div className="overflow-height w-full lg:w-10/12 overflow-y-scroll bg-orange-100   p-5 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
