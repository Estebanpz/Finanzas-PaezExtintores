import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const RutaPrivada = ({children}) => {
    const {usuario} = useAuth();
    
	if(usuario !== null){
		return children;
	} else {
		return <Navigate to="/iniciar-sesion"/>;
	};
}
 
export default RutaPrivada;