import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import styles from "../../dashboardNav/header.module.css";
// import {BiSearch} from "react-icons"

import { RiAddCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";

type TProps = {
  status: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
  children: React.ReactNode;
  to: string;
  getBySearch:any;
  getAll:any
};

const MainContent = ({ status, error, children, to,getBySearch,getAll }: TProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed !== "") {
        dispatch(getBySearch(searchTerm));
      } else {
        dispatch(getAll());
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="relative w-1/2 mx-auto">
        <input
          type="text"
          placeholder=" ابحث"
          className="p-4 w-full rounded-lg border text-center"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>
      <Loading status={status} error={error}>
        {to === "orders" ? null : (
          <div className={`p-11 ${to=="messages" && "hidden"}`}>
            <button
              className={`${styles.btn} mb-4 `}
              onClick={() => {
                navigate(`/${to}/add`);
              }}
            >
              <RiAddCircleLine />
            </button>
          </div>
        )}

        {children}
      </Loading>
    </>
  );
};

export default MainContent;
