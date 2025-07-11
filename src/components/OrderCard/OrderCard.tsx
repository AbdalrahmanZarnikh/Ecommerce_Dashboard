import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { MdDone,  } from "react-icons/md";
import {  updateOrderToPay } from "../../redux/slice/orders/orderSlice";

interface OrderCardProps {
  id?: string;
  cartItems: {
    product: {
      _id:string,
      title:string
    };
    quantity: number;
    color?: string;
    price: number;
  }[];
  shippingAddress: { phone: string; city: string; details: string };
  taxPrice?: number;
  totalOrderPrice: number;
  user: {
    _id:string,
    name:string
  };
  paymentMethod: string;
  isPaid: boolean;
  paidAt: Date;
  hawalaCompany: string;
  hawalaCode: { url: string; public_id: string };
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  cartItems,
  shippingAddress,
  taxPrice,
  totalOrderPrice,
  user,
  paymentMethod,
  isPaid,
  paidAt,
  hawalaCode,
  hawalaCompany,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickUpdate = () => {

    const fn = async()=>{

    const result=  dispatch(updateOrderToPay(id))
      
      if(updateOrderToPay.fulfilled.match(result)){
        navigate("/orders")
      }
    }
    fn()
  };


  return (
    <div className={`TestimonialsCard rounded-lg shadow-lg text-white font-bold  xs:p-4 md:p-8  ${isPaid ? "bg-green-500" : "bg-orange-500"}`}>
      <div className={`flex justify-end gap-3 mb-2 ${isPaid && "hidden"}`}>
        <button
          className="text-2xl text-white hover:bg-red-400 bg-gray-700 p-2 rounded-lg"
          onClick={handleClickUpdate}
        >
          <MdDone />
        </button>
      </div>

      <div className="space-y-2 text-xl">
        <p><span className="font-bold text-black">المستخدم:</span> {user?.name}</p>
        <p><span className="font-bold text-black">طريقة الدفع:</span> {paymentMethod}</p>
        <p><span className="font-bold text-black">تم الدفع:</span> {isPaid ? "نعم" : "لا"}</p>
        {isPaid && <p><span className="font-bold text-black">تاريخ الدفع:</span> {new Date(paidAt).toLocaleDateString()}</p>}
        <p><span className="font-bold text-black">شركة الحوالة:</span> {hawalaCompany}</p>
        <p><span className="font-bold text-black">السعر الكلي:</span> {totalOrderPrice} ل.س</p>
         <p><span className="font-bold text-black">الضريبة:</span> {taxPrice} ل.س</p>

        <div className="mt-2">
          <h3 className="font-bold text-black">العنوان:</h3>
          <p>{shippingAddress?.city} - {shippingAddress?.details}</p>
          <p> {shippingAddress?.phone}</p>
        </div>

        <div className="mt-2">
          <h3 className="font-bold text-black">المنتجات:</h3>
          <ul className="list-disc list-inside">
            {cartItems.map((item, index) => (
              <li key={index}>
                {item?.product?.title || " "} - الكمية: {item?.quantity} - السعر: {item.price} ل.س
                {item.color && <> - اللون: {item.color}</>}
              </li>
            ))}
          </ul>
        </div>

        {hawalaCode?.url && (
          <div className="mt-2">
            <h3 className="font-bold">صورة الحوالة:</h3>
            <img
              src={hawalaCode.url}
              alt="hawala code"
              className="w-40 h-40 object-contain border rounded"
            />
          </div>
        )}
      </div>

     
    </div>
  );
};

export default OrderCard;
