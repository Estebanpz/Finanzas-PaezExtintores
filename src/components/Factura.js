import { IconShoppingCart } from "@tabler/icons-react";
import TablaProductos from "./tablaProductos";
import ModalCrearUsuario from "./modalCrearUsuario";
import ModalBuscarUsuario from "./ModalBuscarUsuario";
import { useState } from "react";
const Factura = () => {
    const [carrito, setCarrito] = useState([]);
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
                                <ModalBuscarUsuario />
                            </li>
                            {/* FECHA DE VENTA*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col text-center">
                                        <label className="form-label">Fecha de venta</label>
                                    </div>
                                    <div className="col">
                                        <input type="date" className="form-control" required />
                                    </div>
                                </div>
                            </li>
                            {/* NUMERO DE FACTURA*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><label className="form-label"># Factura interna</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="number" name="nFactura" required />
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

                        <TablaProductos carrito={carrito} setCarrito = {setCarrito}/>
                    </div>
                </div>
            </div>
        </main>
    </>
    );
}

export default Factura;