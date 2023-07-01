import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";
const CrearCliente = async(cliente) => {
    try {
        const ref = await collection(db, "clientes");
        const doc =  await addDoc(ref, cliente);
        console.log(doc.id);
    } catch (error) {
        console.log(error);
    }
}
 
export default CrearCliente;