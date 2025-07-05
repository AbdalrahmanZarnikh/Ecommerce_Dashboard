// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import { addUser, updateUser } from "../../../redux/slice/users/userSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";

// Types
type Inputs = {
  name: string;
  email?: string;
  password: string;
  role: string;
};

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.userSlice
  );

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const record = records.find((item) => item._id === id);
      if (record) {
        setName(record.name);
        setEmail(record.email);
        setRole(record.role);
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
      email,
      role,
    },
  });

  useEffect(() => {
    reset({ name, role, email });
  }, [name, email, role, reset]);

  // Function To Handle Submit
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    
    if(isUpdateMode && data.email===email){
      delete data.email;
    }

    const action = isUpdateMode
      ? updateUser({ id: id, data })
      : addUser(data);

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else if(isLoading=="Success") {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/users");
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
            placeholder="ادخل الاسم .."
            {...register("name", { required: "The Name is Required" })}
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="ُEmail">البريد الاكتروني</label>
          <input
            id="ُEmail"
            type="email"
            placeholder="ادخل البريد الاكتروني ..."
            {...register("email", { required: "The Email is Required" })}
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Password">كلمة المرور</label>
          <input
            id="Password"
            type="password"
            placeholder="ادخل كلمة مرور "
            {...register("password", { required: "The Password is Required" })}
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Role">نوع الحساب</label>
          <input
            id="Role"
            type="text"
            placeholder="ادخل نوع الحساب اما user او admin "
            {...register("role", { required: "The Role is Required" })}
          />
          {errors.role && (
            <span className="text-red-400">{errors.role.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          {typeof id == "string" ? "تعديل" : "اضافة"}
        </button>
      </form>
    </Loading>
  );
};

export default UserForm;
