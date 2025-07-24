import React, { memo } from "react";

type Props={
    children:React.ReactNode,
    numberOfItems:number,
}

const ShowNumberMessages:React.FC<Props>= memo(({ children, numberOfItems }) => {
  return (
    <div className="relative">
      {numberOfItems > 0 ? (
        <div className="absolute -left-1 bottom-5 rounded-full bg-blue-700  w-4 h-4 text-center text-white text-[10px] font-semibold">
          {numberOfItems}
        </div>
      ) : null}
      {children}
    </div>
  );
})

export default ShowNumberMessages;
