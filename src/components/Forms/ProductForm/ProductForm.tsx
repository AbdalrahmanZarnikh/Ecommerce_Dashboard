// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import {
  addProduct,
  updateProduct,
} from "../../../redux/slice/product/productSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";
import UploadImage from "../../common/uploadImage/UploadImage";
import { getAllCategories } from "../../../redux/slice/categories/categorySlice";
import { getAllBrands } from "../../../redux/slice/brands/brandSlice";
import UploadMultipleImages from "../../common/UploadMultipleImages/UploadMultipleImages";

// Types
type Inputs = {
  title: string;
  image: string;
  images?: string[];
  price: number;
  category: string;
  brand: string;
  description: string;
  quantity: number;
};

type Category = { _id: string; name: string };
type Brand = { _id: string; name: string };

const ProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const { id } = useParams<{ id: string }>();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.productSlice
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      const result1 = await dispatch(getAllCategories());

      if (getAllCategories.fulfilled.match(result1)) {
        setCategories(result1.payload);
      }
      const result2 = await dispatch(getAllBrands());

      if (getAllBrands.fulfilled.match(result2)) {
        setBrands(result2.payload);
      }
    };
    fn();
  }, [dispatch]);

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {},
  });

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode && records.length > 0) {
      const found = records.find((item) => item._id === id);
      if (found) {
        reset({
          title: found.title,
          description: found.description,
          price: found.price,
          quantity: found.quantity,
          category: found.category?._id || "",
          brand: found.brand?._id || "",
        });
      }
    }
  }, [id, isUpdateMode, records, reset]);

  // Function To Handle Submit
  const form = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    form.append("title", data.title);
    form.append("description", data.description);
    form.append("category", data.category);
    if (brands.length > 0) {
      form.append("brand", data.brand);
    }
    form.append("price", data.price.toString());
    form.append("quantity", data.quantity.toString());

    const action = isUpdateMode
      ? updateProduct({ id: id, data: form })
      : addProduct(form);

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/products");
      }
    });
  };

  return (
    <Loading status={isLoading} error={error}>
      <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="Title">الاسم </label>
          <input
            id="Title"
            type="text"
            placeholder="ادخل اسم ..."
            {...register("title", { required: "The Title is Required" })}
          />
          {errors.title && (
            <span className="text-red-400">{errors.title.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Description">الوصف </label>
          <input
            id="Description"
            type="text"
            placeholder="ادخل وصف ...."
            {...register("description", {
              required: "The Description is Required",
              minLength:15
            })}
          />
          {errors.description && (
            <span className="text-red-400">{errors.description.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Price">السعر</label>
          <input
            id="Price"
            type="number"
            min={"0"}
            placeholder="ادخل سعر ..."
            {...register("price", {
              required: "The Price is Required",
            })}
          />
          {errors.price && (
            <span className="text-red-400">{errors.price.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Quantity">الكمية</label>
          <input
            id="Quantity"
            type="number"
            min={"0"}
            placeholder="ادخل الكمية ..."
            {...register("quantity", {
              required: "The quantity is Required",
            })}
          />
          {errors.quantity && (
            <span className="text-red-400">{errors.quantity.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Category">القسم</label>
          <select
            id="Category"
            {...register("category", { required: " category required" })}
          >
            <option>اختر قسماً</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-400">{errors.category.message}</span>
          )}
        </div>
        {brands.length > 0 && (
          <div className="form-group">
            <label htmlFor="Brand">الماركة</label>
            <select
              id="Brand"
              {...register("brand", { required: " brand required" })}
            >
              <option value="">اختر الماركة</option>
              {brands.map((bra) => (
                <option key={bra._id} value={bra._id}>
                  {bra.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <span className="text-red-400">{errors.brand.message}</span>
            )}
          </div>
        )}

        <UploadImage form={form} type="image" records={records} />
        <UploadMultipleImages form={form} records={records} />

        <button type="submit" className="submit-button">
          {typeof id == "string" ? "تعديل" : "اضافة"}
        </button>
      </form>
      
    </Loading>
  );
};

export default ProductForm;
