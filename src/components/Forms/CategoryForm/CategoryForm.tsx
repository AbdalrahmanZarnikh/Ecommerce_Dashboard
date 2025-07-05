// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import {
  addCategory,
  updateCategory,
} from "../../../redux/slice/categories/categorySlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";
import UploadImage from "../../common/uploadImage/UploadImage";

// Types
type Inputs = {
  name: string;
  image: string;
};

const CategoryForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  // Info From Slice
  const { categories, isLoading, error } = useAppSelector(
    (state) => state.categorySlice
  );

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const record = categories.find((item) => item._id === id);
      if (record) {
        setName(record.name);
      }
    }
  }, [id, isUpdateMode, categories]);

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name
    },
  });

  useEffect(() => {
    reset({ name });
  }, [name, reset]);

  // Function To Handle Submit
  const form = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    form.append("name", data.name);


    const action = isUpdateMode
      ? updateCategory({ id: id, data: form })
      : addCategory(form);

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/categories");
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


        <UploadImage form={form} type="image" records={categories} />

        <button type="submit" className="submit-button">
          {typeof id == "string" ? "تعديل" : "اضافة"}
        </button>
      </form>
    </Loading>
  );
};

export default CategoryForm;
