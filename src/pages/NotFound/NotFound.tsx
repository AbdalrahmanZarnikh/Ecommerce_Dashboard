import Lottie from "lottie-react"
import notfound from "../../services/notfound.json"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
        <Lottie animationData={notfound}/>
        <p className="text-4xl mb-4">Not Found Page </p>
        <Link className="text-blue-500 hover:text-blue-300" to={"/"} replace={true}>Back To HomePage</Link>
    </div> 
  )
}

export default NotFound