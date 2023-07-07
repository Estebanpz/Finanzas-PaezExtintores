import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";
const CrearFactura = async(factura) => {
    try {
        const ref = collection(db, "facturas");
         await addDoc(ref, factura);
    } catch (error) {
        console.log(error);
    }
}
 
export default CrearFactura;