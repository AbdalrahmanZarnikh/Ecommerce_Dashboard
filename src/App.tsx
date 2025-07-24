import { Route, Routes } from "react-router-dom";
import DashBoardLayout from "./pages/Layout";

// To Set BaseUrl To Any axios Request
import "./services/axios-global";
import NotFound from "./pages/NotFound/NotFound";
import { DashBoardLinks } from "./constants";
import NewItem from "./components/common/NewItem/NewItem";
import CategoryForm from "./components/Forms/CategoryForm/CategoryForm";

import Login from "./pages/login/Login";
import BrandForm from "./components/Forms/BrandForm/BrandForm";
import UserForm from "./components/Forms/UserForm/UserForm";
import ProductForm from "./components/Forms/ProductForm/ProductForm";
import ProtectedRoute from "./services/ProtectedRoute";
import CouponForm from "./components/Forms/CouponForm/CouponForm";
import Messages from "./pages/messages/Messages";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoardLayout />
            </ProtectedRoute>
          }
        >
          {DashBoardLinks.map((ele) => {
            return <Route path={ele.path} element={ele.childComponente} />;
          })}
          <Route path="/messages" element={<Messages/>}/>
          <Route
            path="/categories/add"
            element={
              <NewItem>
                <CategoryForm />
              </NewItem>
            }
          />
          <Route
            path="/categories/update/:id"
            element={
              <NewItem>
                <CategoryForm />
              </NewItem>
            }
          />
          <Route
            path="/coupons/add"
            element={
              <NewItem>
                <CouponForm />
              </NewItem>
            }
          />
          <Route
            path="/coupons/update/:id"
            element={
              <NewItem>
                <CouponForm />
              </NewItem>
            }
          />
          <Route
            path="/brands/add"
            element={
              <NewItem>
                <BrandForm />
              </NewItem>
            }
          />
          <Route
            path="/brands/update/:id"
            element={
              <NewItem>
                <BrandForm />
              </NewItem>
            }
          />
          <Route
            path="/users/add"
            element={
              <NewItem>
                <UserForm />
              </NewItem>
            }
          />
          <Route
            path="/users/update/:id"
            element={
              <NewItem>
                <UserForm />
              </NewItem>
            }
          />
          <Route
            path="/products/add"
            element={
              <NewItem>
                <ProductForm />
              </NewItem>
            }
          />
          <Route
            path="/products/update/:id"
            element={
              <NewItem>
                <ProductForm />
              </NewItem>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
