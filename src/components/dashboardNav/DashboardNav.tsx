// import React from "react";
import {  useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import Navbar from "./Navbar";


const DashboardNav = () => {
  const navigate= useNavigate()
   
   const name = localStorage.getItem("name")
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
      <>
            <strong className="text-blue-800 md:text-xl capitalize">
              {name}
            </strong>
            <button
              onClick={() => {
                localStorage.removeItem("token")
                navigate("/login" ,{replace:true})
              }}
              className="bg-gray-700 py-2 hover:bg-gray-400 text-white font-bold px-2  rounded"
            >
              تسجيل الخروج
            </button>
          </>
      </div>
    </header>
  );
};

export default DashboardNav;
