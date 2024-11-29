import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { CATALOG_ROUTE } from "../utils/consts";
import { jwtDecode } from "jwt-decode";
import { Context } from '..';

const GoogleCallback = () => {
    const { user } = useContext(Context);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (token){
        localStorage.setItem('token', token);
      }
      const data = jwtDecode(token);
      user.setUser(data);
      user.setAuth(true);
      window.location.href = CATALOG_ROUTE;
    }, []);

    return (
      <div>
        
      </div>
    );
  }
  
export default GoogleCallback;