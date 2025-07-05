import React, { useEffect, useState } from "react";


// Components
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";

// Thunks

import { getAllOrders } from "../../redux/slice/orders/orderSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import OrderCard from "../../components/OrderCard/OrderCard";


const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedFilter,setSelectedFilter]=useState("all")

  // Info From Slice
  const { orders, isLoading, error } = useAppSelector(
    (state) => state.orderSlice
  );

  // For Fetching All Orders From Slice
  useEffect(() => {
    dispatch(getAllOrders(selectedFilter));
  }, [dispatch ,selectedFilter]);

  


  return (


    <MainContent status={isLoading} error={error} to="orders">
      <div className="p-10 flex justify-start items-center gap-4 ">
        <button className={`text-3xl bg-red-500 hover:bg-red-300 text-white p-2 rounded-lg mb-4 cursor-pointer`} onClick={()=>{
          setSelectedFilter("all")
        }}>الكل</button>
        <button className={`text-3xl bg-green-500  hover:bg-green-300 text-white p-2 rounded-lg mb-4 cursor-pointer`}  onClick={()=>{
          setSelectedFilter("true")
        }}>تم الدفع</button>
        <button className={`text-3xl bg-orange-500 hover:bg-orange-300 text-white p-2 rounded-lg mb-4  cursor-pointer`}  onClick={()=>{
          setSelectedFilter("false")
        }}>لم يتم الدفع</button>
      </div>
      <GridList
        records={orders}
        renderItems={(record) => (
          <OrderCard
            id={record._id}
            paymentMethod={record.paymentMethod}
            paidAt={record.paidAt}
            isPaid={record.isPaid}
            cartItems={record.cartItems}
            hawalaCode={record.hawalaCode}
            hawalaCompany={record.hawalaCompany}
            user={record.user}
            shippingAddress={record.shippingAddress}
            taxPrice={record.taxPrice}
            totalOrderPrice={record.totalOrderPrice}
            

            
            
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Orders;
