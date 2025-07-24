import React, { useEffect } from "react";

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
import NewItem from "../../components/common/NewItem/NewItem";
import MessageCard from "../../components/MessageCard/MessageCard";

const Messages: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.messageSlice
  );

  // For Fetching All  From Slice
  useEffect(() => {
    dispatch(getAllMessages());
   
  }, [dispatch]);

  return (
    <NewItem>
      <MainContent
        status={isLoading}
        error={error}
        to="messages"
        getBySearch={getMessagesSearch}
        getAll={getAllMessages}
      >
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
    </NewItem>
  );
};

export default Messages;
