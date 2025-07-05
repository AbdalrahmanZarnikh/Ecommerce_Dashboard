import React, { useEffect } from "react";

// Components
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import ProductCard from "../../components/ProductCard/ProductCard";

// Thunks

import { getAllProducts } from "../../redux/slice/product/productSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.productSlice
  );

  // For Fetching All Products From Slice
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  


  return (


    <MainContent status={isLoading} error={error} to="products">
      <GridList
        records={records}
        renderItems={(record) => (
          <ProductCard
            id={record._id}
            title={record.title}
            image={record.image?.url}
            description={record.description}
            category={record.category}
            price={record.price}
            brand={record.brand}
            quantity={record.quantity}
            images={record.images}

          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Products;
