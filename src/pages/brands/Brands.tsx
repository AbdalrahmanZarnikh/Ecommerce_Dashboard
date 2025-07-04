import React, { useEffect } from "react";

// Components
import CategoryCard from "../../components/CategoryCard/CategoryCard";

// Thunks

import { getAllBrands } from "../../redux/slice/brands/brandSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.brandSlice
  );

  // For Fetching All Categories From Slice
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="brands">
      <GridList
        records={records}
        renderItems={(record) => (
          <CategoryCard
            id={record._id}
            name={record.name}
            image={record.image?.url}
            updateTo="brands"
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Categories;
