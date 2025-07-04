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
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashBoardLayout />}>
          {DashBoardLinks.map((ele) => {
            return <Route path={ele.path} element={ele.childComponente} />;
          })}
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
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
