import {signInWithEmailAndPassword } from "firebase/auth"
import {auth} from "./../firebase/config"
const IniciarSesion = async (email,password) => {
    await signInWithEmailAndPassword(auth,email, password)
}
 
export default IniciarSesion;