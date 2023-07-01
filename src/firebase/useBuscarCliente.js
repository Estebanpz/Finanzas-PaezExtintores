import { db } from "./config";
import { collection, query, where, getDocs } from "firebase/firestore";
const BuscarCliente = async (value) => {
        const ref = collection(db, "clientes");
        const consulta = query(ref, where("documento", "==", Number(value)));
        const documentos = await getDocs(consulta);
        return documentos;
    }
export default BuscarCliente;