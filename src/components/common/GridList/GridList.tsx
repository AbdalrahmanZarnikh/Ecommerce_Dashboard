import React from "react";
import Lottie from "lottie-react";
import notfound from "./not found.json";

type TGridListProps<T> = {
  records: T[];
  renderItems: (record: T) => React.ReactNode;
  grid: boolean;
};

const GridList = <T,>({ records, renderItems, grid }: TGridListProps<T>) => {
  const flag=records.length> 0 ? true : false;
  const List =
    records.length > 0 ? (
      records?.map((record, index) => {
        return (
          <div className="mb-6" key={index}>
            {renderItems(record)}
          </div>
        );
      })
    ) : (
      <Lottie
        animationData={notfound}
        style={{ width: "400px" }}
        className="m-auto mt-10 "
      />
    );
  return (
    <div
      className={`${grid && flag ? "grid  gap-4 xs:grid-cols-1 md:grid-cols-2 " : ""}`}
    >
      {List}
    </div>
  );
};

export default GridList;
