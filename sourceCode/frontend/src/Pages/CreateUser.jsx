import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

const CreateUser = () => {

    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)
    useEffect(()=>{
      if (user === undefined) {
        navigate('/login')
      }
      else if (user["privlevel"] !== 1){
        navigate('/noaccess')
      }
    }, [])

    return <h2 className="container container-centered">Create User</h2>;
};  
export default CreateUser;