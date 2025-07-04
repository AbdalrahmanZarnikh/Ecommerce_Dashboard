import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import styles from "../../dashboardNav/header.module.css";

import { RiAddCircleLine } from "react-icons/ri";

type TProps = {
  status: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
  children: React.ReactNode;
  to: string;
};

const MainContent = ({ status, error, children, to }: TProps) => {
  const navigate = useNavigate();
  return (
    <Loading status={status} error={error}>
      <div className="p-11">
        <button
          className={`${styles.btn} mb-4`}
          onClick={() => {
            navigate(`/${to}/add`);
          }}
        >
          <RiAddCircleLine/>
        </button>
        {children}
      </div>
    </Loading>
  );
};

export default MainContent;
