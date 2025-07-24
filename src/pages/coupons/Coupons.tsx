import React, { useEffect } from "react";

// Components
import CouponCard from "../../components/CouponCard/CouponCard";

// Thunks

import { getAllCoupons,getCouponsSearch} from "../../redux/slice/coupons/couponSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";

const Coupons: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.couponSlice
  );

  // For Fetching All  From Slice
  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="coupons" getBySearch={getCouponsSearch} getAll={getAllCoupons}>
      <GridList
        records={records}
        renderItems={(record) => (
          <CouponCard
            id={record._id}
            name={record.name}
            expire={record.expire}
            discount={record.discount}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Coupons;
