import { auth, createUserWithEmailAndPassword } from "./config";
export const CrearUsuario = async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
}