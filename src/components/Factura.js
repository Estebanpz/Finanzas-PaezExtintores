import { IconShoppingCart } from "@tabler/icons-react";
import TablaProductos from "./tablaProductos";
import ModalCrearUsuario from "./modalCrearUsuario";
import ModalBuscarUsuario from "./ModalBuscarUsuario";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useState } from "react";
import "react-day-picker/dist/style.css"
import Cliente from "./Cliente";
const Factura = () => {
    let footer = <p>Por favor selecciona una fecha</p>

    const [carrito, setCarrito] = useState([]);
    const [fecha, setFecha] = useState();
    const [cliente, setCliente] = useState('');
    const [mostrar, setMostrar] = useState('')
    if (fecha) {
        footer = <p>Tu fecha es: {format(fecha, 'PP')}</p>
        console.log(JSON.parse(fecha));
    }
    const css = `
    .my-today {
    font-weight: bold;
    font-size: 140%; 
    color: red;
    background: url(https://media3.giphy.com/media/ujpaHBFQxnZIALTObQ/giphy.gif);
    background-size: cover;
    }
    .my-selected:not([disabled]) {
    font-weight: bold; 
    border: 2px solid currentColor;
    background: url(https://media.tenor.com/TbJMxT_BQvgAAAAC/sussy.gif);
    background-size: cover;
    }
`;
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
                                    <div className="col text-center">
                                        <label className="form-label">Fecha de venta</label>
                                    </div>
                                    <div className="col-sm h-50">
                                        <DayPicker
                                            mode="single"
                                            selected={fecha}
                                            onSelect={setFecha}
                                            footer={footer}
                                            showOutsideDays
                                            numberOfMonths={1}
                                            styles={{ dropdown: 'yes' }}
                                            modifiersClassNames={{
                                                selected: 'my-selected',
                                                today: "my-today"
                                            }}
                                        />
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
                        {cliente && cliente.length > 0 && <Cliente cliente={cliente} mostrar={mostrar} />}
                        <TablaProductos carrito={carrito} setCarrito={setCarrito} />
                    </div>
                </div>
            </div>
        </main>
    </>
    );
}

export default Factura;