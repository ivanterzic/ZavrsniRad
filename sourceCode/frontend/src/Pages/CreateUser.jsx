import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        if (sessionStorage.getItem("username") === undefined) {
            navigate('/login')
          }
          if (sessionStorage.getItem("level") !== "1"){
            navigate('/noaccess')
          }
    }, [])

    return <h2 className="container container-centered">Create User</h2>;
};  
export default CreateUser;