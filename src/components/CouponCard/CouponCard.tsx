// Styles
import styles from "../../styles";

// Router-Dom
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {deleteCoupon} from "../../redux/slice/coupons/couponSlice"


// Component
import Modal from "../Modal/Modal";

// Hooks
import { useState } from "react";

//React-Hot-Toast
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// Types
interface CouponCardProps {
  name?: string;
  id?: string;
  expire: string;
  discount: number;
}

const CouponCard: React.FC<CouponCardProps> = ({
  name,
  id,
  expire,
  discount,
}) => {
  // State For Modal To Open And Close
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.categorySlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = () => {
    navigate(`/coupons/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteCoupon(id as string));
    if (!error) {
      toast.success("item deleted successfully");
    } else {
      toast.error("try again");
    }
  };

  return (
    <div
      className={`TestimonialsCard ${styles.cardStyle} xs:p-4 md:p-12  h-full`}
    >
      <div className="flex justify-end items-center  gap-3 mb-2">
        <button
          className="text-2xl  text-white hover:bg-red-400 bg-[#FF8D4C] p-2 rounded-lg"
          onClick={handleClickUpdate}
        >
          <MdEdit />
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-2xl text-white hover:bg-red-400 bg-red-600 p-2 rounded-lg"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
      <div className="profile text-center flex flex-col">
        <span className="text-Grey_15 fontA-semibold md:text-[24px] text-[20px]">
           اسم الكوبون : {name}
        </span>
        <span className="text-Grey_15 font-semibold md:text-[24px] text-[20px]">
           مدة الكوبون : {expire}
        </span>

        <span className="text-Grey_15 font-semibold md:text-[24px] text-[20px]">
          قيمة الخصم : {discount}
        </span>
      </div>

      {/* Modal Component To Show When Click On Delete Button */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        handleClickDelete={handleClickDelete}
      />
    </div>
  );
};

export default CouponCard;
