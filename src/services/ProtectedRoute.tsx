import { Navigate } from "react-router-dom";

type TProps={
    children:React.ReactNode
}

const ProtectedRoute = ({children}:TProps) => {
    const token=localStorage.getItem("token");

    if(!token){
        return <Navigate to={"/login"} replace/>
    }

  return children
}

export default ProtectedRoute