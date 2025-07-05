// Styles
import styles from "../../styles";

// Router-Dom
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Thunk
import { deleteUser } from "../../redux/slice/users/userSlice";

// Component
import Modal from "../Modal/Modal";

// Hooks
import { useState } from "react";

//React-Hot-Toast
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// Types
interface UserCardProps {
  name?: string;
  id?: string;
  email: string;
  password: string;
  role: string;
  addresses: [
    {
      phone: string;
      city: string;
      details: string;
    }
  ];
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  addresses,
  role,
  id,
}) => {
  // State For Modal To Open And Close
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.categorySlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = () => {
    navigate(`/users/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteUser(id as string));
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
      <div className="profile flex flex-col">
        <p> <span className="font-bold">الاسم :</span> {name}</p>
        <p> <span className="font-bold">البريد الاكتروني :</span> {email}</p>
        <p> <span className="font-bold">نوع الحساب :</span> {role}</p>


        <div>
          {addresses.length > 0 &&
            addresses.map((address, index) => {
              return (
                  <div className="flex justify-between">
                  <h1 className="font-bold">العنوان  {index + 1} :</h1>
                  <p className="">{address.city}</p>
                  <p className="">{address.phone}</p>
                  <p className="">{address.details}</p>
                </div>
              );
            })}
        </div>
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

export default UserCard;
