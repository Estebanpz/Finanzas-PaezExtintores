import { IconFile, IconShoppingCart } from "@tabler/icons-react";
import TablaProductos from "./tablaProductos";
import ModalCrearUsuario from "./modalCrearUsuario";
import ModalBuscarUsuario from "./ModalBuscarUsuario";
import InputFecha from "./InputFecha";
import { useState } from "react";
import "react-day-picker/dist/style.css"
import Cliente from "./Cliente";
import { getUnixTime } from "date-fns";
import Swal from "sweetalert2";
import CrearFactura from "../firebase/CrearFactura";
import ObtenerFacturas from "../firebase/ObtenerFacturas";
const Factura = () => {

    const [carrito, setCarrito] = useState([]);
    const [fecha, setFecha] = useState('');
    const [cliente, setCliente] = useState('');
    const [mostrar, setMostrar] = useState('')
    const [cargando, cambiarCargando] = useState(null)
    const [factura, setFactura] = useState('');
    const [numeroFactura, cambiarNumeroFactura] = useState(0)


    const crearFactura = async () => {
        cambiarCargando(true)
        if (!cliente) {
            Swal.fire("Alerta.", "Es necesario que proporciones un cliente.", "info");
            cambiarCargando(null)
            return;
        }

        if (carrito.length <= 0) {
            cambiarCargando(null)
            Swal.fire("Alerta.", "No es posible crear una factura vacia.", "question");
            return;
        }

        if (fecha === undefined || fecha === isNaN || fecha === '') {
            Swal.fire("Alerta.", "Digita una fecha de venta, es obligatorio.", "warning");
            cambiarCargando(null)
            return;
        }

        if (numeroFactura === 0 || numeroFactura === isNaN) {
            Swal.fire("Alerta.", "Digita el consecutivo de venta,debe ser único", "warning");
            cambiarCargando(null)
            return;
        }
        setFactura({
            idCliente: cliente[0].data.documento,
            compra: carrito,
            idFactura: numeroFactura,
            fecha: getUnixTime(fecha)
        })
        console.log(numeroFactura);
        let result = await ObtenerFacturas()
        let ventas = []
        let NFactura = null;
        const even = (venta) => venta.idFactura === numeroFactura;
        result.forEach(async (v) => {
            await ventas.push(v.data())
        })
        NFactura = ventas.some(even);

        if (!NFactura) {
            cambiarCargando(null);
            try {
                await CrearFactura({
                    idCliente: cliente[0].data.documento,
                    compra: carrito,
                    idFactura: numeroFactura,
                    fecha: getUnixTime(fecha)
                });
                Swal.fire("Éxito", `Factura #${numeroFactura} ha sido creada correctamente.`, "success")
                setCarrito([])
                setCliente('')
                cambiarNumeroFactura(0)
            } catch (error) {
                console.log(error);
            }
        } else {
            Swal.fire("Número de facturación.", "Ya existe una factura con este mismo número.", "error")
            cambiarCargando(null)
        }

    }
    return (<>
        <main className="container">
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Factura de venta</h2>
                        <ul className="list-group list-group-horizontal mb-3">
                            <li className="list-group-item">
                                <ModalCrearUsuario />
                            </li>
                            {/* MODAL BUSCAR CLIENTE*/}

                            <li className="list-group-item">
                                <ModalBuscarUsuario cliente={cliente} setCliente={setCliente}
                                    mostrar={mostrar} setMostrar={setMostrar} />
                            </li>

                            {/* FECHA DE VENTA*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col w-100">
                                        <InputFecha fecha={fecha} cambiarFecha={setFecha} setCarrito={setCarrito} carrito={carrito} />
                                    </div>
                                </div>
                            </li>
                            {/* NUMERO DE FACTURA*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><label className="form-label"># Factura interna</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="number" name="nFactura" required
                                            value={numeroFactura}
                                            onChange={(e) => cambiarNumeroFactura(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                            </li>
                        </ul>

                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item">
                                <IconShoppingCart size={26} />
                                <span className="h5">Productos</span>
                            </li>
                        </ul>
                        {cliente && cliente.length > 0 && <Cliente cliente={cliente} mostrar={mostrar} />}
                        <TablaProductos carrito={carrito} setCarrito={setCarrito} />
                    </div>
                    <div className="card-footer">
                        {
                            cargando === null && <button className="btn btn-info" onClick={crearFactura}>
                                Crear factura de venta
                                <IconFile />
                            </button>
                        }

                        {cargando === true && <button className="btn btn-info" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm text-dark" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>}
                    </div>
                </div>
            </div>
        </main>
    </>
    );
}

export default Factura;