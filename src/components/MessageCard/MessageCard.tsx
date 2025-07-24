// Styles
import styles from "../../styles";

// Router-Dom

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


// Component
import Modal from "../Modal/Modal";

// Hooks
import { useState } from "react";

//React-Hot-Toast
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteMessage } from "../../redux/slice/messages/messageSlice";

// Types
interface MessageCardProps {
  name?: string;
  id?: string;
  message:string
}

const MessageCard: React.FC<MessageCardProps> = ({
  name,
  id,
  message,
}) => {
  // State For Modal To Open And Close
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.categorySlice);

  const dispatch = useAppDispatch();


  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteMessage(id as string));
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
            اسم المرسل  : {name}
        </span>
        <span className="text-Grey_15 font-semibold md:text-[24px] text-[20px]">
            نص الرسالة : <span className="text-sm md:text-xl">{message}</span>
        </span>

        {/* <span className="text-Grey_15 font-semibold md:text-[24px] text-[20px]">
          قيمة الخصم : {discount}
        </span> */}
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

export default MessageCard;
