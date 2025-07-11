import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { DashBoardLinks } from "../../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div>
        <h1 className="hidden md:block text-blue-700 font-bold text-4xl">متجري</h1>
        <div className={`${styles.menu} block sm:hidden`}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>
      <div
        className={`${styles.navLinksWrapper} block sm:hidden `}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <ul className={`${styles.navLinks} block sm:hidden`}>
          {DashBoardLinks.map((item, index) => {
            if (item.label == "Dashboard" || item.label == "Contact") {
              return;
            }
            return (
              <Link
                key={index}
                onClick={() => setToggle(false)}
                className={styles.navLink}
                to={item.path}
              >
                {item.label}
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
