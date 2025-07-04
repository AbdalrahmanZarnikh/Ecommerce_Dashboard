
// Styles
import styles from "../../styles";

// Router-Dom
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Thunk
import { deleteBrand } from "../../redux/slice/brands/brandSlice";

// Component
import Modal from "../Modal/Modal";

// Hooks
import { useState } from "react";

//React-Hot-Toast
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// Types
interface CategoryCardProps {
  image?: string;
  name?: string;
  id?: string;
  updateTo:string,
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, name, id ,updateTo}) => {
  // State For Modal To Open And Close
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.categorySlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = () => {
    navigate(`/${updateTo}/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteBrand(id as string));
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
          className="text-4xl  text-white hover:bg-red-400 bg-[#FF8D4C] p-2 rounded-lg"
          onClick={handleClickUpdate}
        >
          <MdEdit />
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-4xl text-white hover:bg-red-400 bg-red-600 p-2 rounded-lg"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
      <div className="profile text-center">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full mx-auto md:mb-3 mb-2 bg-Orange_97 border border-black"
        />
        <span className="text-Grey_15 font-semibold md:text-[24px] text-[20px]">
          {name}
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

export default CategoryCard;
