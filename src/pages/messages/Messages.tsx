import React, { useEffect } from "react";

import styles from "../../components/dashboardNav/header.module.css"


// Thunks

import {
  getAllMessages,
  getMessagesSearch,
} from "../../redux/slice/messages/messageSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import MessageCard from "../../components/MessageCard/MessageCard";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.messageSlice
  );

  // For Fetching All  From Slice
  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  return (
    <MainContent
      status={isLoading}
      error={error}
      to="messages"
      getBySearch={getMessagesSearch}
      getAll={getAllMessages}
    >
      <button
        className={`${styles.btn} mb-4`}
        onClick={() => {
          navigate(-1);
        }}
      >
        <RiArrowGoBackFill />
      </button>
      <GridList
        records={records}
        renderItems={(record) => (
          <MessageCard
            id={record._id}
            name={record.user?.name}
            message={record.message}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Messages;
