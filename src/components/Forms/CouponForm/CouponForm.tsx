// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks

import {
  addCoupon,
  updateCoupon,
} from "../../../redux/slice/coupons/couponSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";

// Types
type Inputs = {
  name: string;
  expire: string;
  discount: number;
};

const CouponForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.couponSlice
  );

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [expire, setExpire] = useState("");
  const [discount, setDiscount] = useState(0);

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const record = records.find((item) => item._id === id);
      if (record) {
        setName(record.name);
        setDiscount(record.discount);
        setExpire(record.expire);
      }
    }
  }, [id, isUpdateMode, records]);

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name,
      expire,
      discount,
    },
  });

  useEffect(() => {
    reset({ name, expire, discount });
  }, [name, expire, discount, reset]);

  // Function To Handle Submit
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const action = isUpdateMode
      ? updateCoupon({ id: id, data })
      : addCoupon(data);

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/coupons");
      }
    });
  };

  return (
    <Loading status={isLoading} error={error}>
      <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="Name">الاسم</label>
          <input
            id="Name"
            type="text"
            placeholder="ادخل اسم ..."
            {...register("name", { required: "The Name is Required" })}
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="ُExpire">المدة</label>
          <input
            id="ُExpire"
            type="text"
            placeholder="ادخل المدة ..."
            {...register("expire", { required: "The Expire is Required" })}
          />
          {errors.expire && (
            <span className="text-red-400">{errors.expire.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Discount">قيمة الخصم</label>
          <input
            id="Discount"
            type="text"
            placeholder="ادخل قيمة الخصم ..."
            {...register("discount", { required: "The Discount is Required" })}
          />
          {errors.discount && (
            <span className="text-red-400">{errors.discount.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          {typeof id == "string" ? "تعديل" : "اضافة"}
        </button>
      </form>
    </Loading>
  );
};

export default CouponForm;
