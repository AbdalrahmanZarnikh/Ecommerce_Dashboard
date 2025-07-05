// Router-Dom
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import Modal from "../Modal/Modal";

// Hooks
import { useState } from "react";

//React-Hot-Toast
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteProduct } from "../../redux/slice/product/productSlice";

// Types
interface ProductCardProps {
  title?: string;
  id?: string;
  description: string | undefined;
  image?: string;
  images?: { url: string; public_id: string }[];
  price?: number;
  category?: { _id: string; name: string };
  brand?: { _id: string; name: string };
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  category,
  price,
  image,
  images,
  brand,
  id,
  quantity,
}) => {
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.categorySlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = () => {
    navigate(`/products/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteProduct(id as string));
    if (!error) {
      toast.success("item deleted successfully");
    } else {
      toast.error("try again");
    }
  };

  return (
    <div className="max-w-sm border rounded-lg p-4 shadow-sm bg-white">
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
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="flex justify-between items-center">
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{category?.name}</p>
          <p className="text-sm text-gray-400">{brand?.name}</p>
          <p className="text-green-600 font-bold mt-1">${price}</p>
        </div>

        <div>
          {images && images.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`preview-${index}`}
                  className="w-14 h-14 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <p>{quantity}</p>
      {/* Modal Component To Show When Click On Delete Button */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        handleClickDelete={handleClickDelete}
      />
    </div>
  );
};

export default ProductCard;
