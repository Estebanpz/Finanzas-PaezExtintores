import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";
const ObtenerFacturas = async () => {
    const ref = collection(db, "facturas");
    const documentos = await getDocs(ref);
    return documentos
}
export default ObtenerFacturas;