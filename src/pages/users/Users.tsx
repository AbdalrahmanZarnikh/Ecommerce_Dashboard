import React, { useEffect } from "react";

// Components
import UserCard from "../../components/UserCard/UserCard";

// Thunks

import { getAllUsers ,getUsersSearch } from "../../redux/slice/users/userSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.userSlice
  );

  // For Fetching All Categories From Slice
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="users" getAll={getAllUsers} getBySearch={getUsersSearch}>
      <GridList
        records={records}
        renderItems={(record) => (
          <UserCard
            id={record._id}
            name={record.name}
            email={record.email}
            password={record.password}
            role={record.role}
            addresses={record.addresses}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Users;
