import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
const Salir = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error);
    }
}

export default Salir;