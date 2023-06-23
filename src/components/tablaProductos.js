import { IconAlertCircle, IconCalculator, IconCircleCheck, IconPencilPlus, IconSearch, IconSquarePlus, IconTrashX, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
const TablaProductos = ({ carrito, setCarrito }) => {
    const [articulo, setArticulo] = useState("");
    const [cantidadArticulo, setCantidadArticulo] = useState(1);
    const [valorUnidad, setValorUnidad] = useState(1);
    const [valorTotal, setValorTotal] = useState(1);
    const [alerta, setalerta] = useState({ tipo: '', mensaje: '' });
    let valor = cantidadArticulo * valorUnidad;
    let valoresTotales = 0;
    const changeTotal = () => {
        setValorTotal(new Intl.NumberFormat('es-CO',
            { style: 'currency', currency: 'COP' }
        ).format(valor));

    }

    const handleArticulo = async (e, id) => {

        switch (e.target.name) {
            case "articulo":
                setArticulo(e.target.value);
                break;
            case "cantidad":
                setCantidadArticulo(Number(e.target.value));
                break;
            case "valor_unidad":
                setValorUnidad(Number(e.target.value))
                break;
            default:
                break;
        }
    }
    const validar = (value) => {
        if (value.length <= 0) {
            setalerta({
                tipo: 'alerta',
                mensaje: 'No se aceptan campos vacios'
            })
            return false;
        }

        setalerta({
            tipo: 'exito',
            mensaje: 'Producto agregado correctamente!'
        })
        return true;
    }
    let nuevoArticulo = null;
    const addArticulo = () => {
        if (validar(articulo) && validar(cantidadArticulo)) {
            nuevoArticulo = {
                id: uuidv4(),
                articulo,
                cantidadArticulo,
                valorUnidad,
                valorTotal,
                valorReal: valor
            }
            console.log(nuevoArticulo);
            setCarrito([...carrito, nuevoArticulo])

            setArticulo('')
            setCantidadArticulo(1)
            setValorUnidad(1)
            setValorTotal(1);
            console.log(carrito);
        }
    }

    const sumarTotales = () => {
        if (carrito.length !== 0) {
            valoresTotales = carrito.reduce((acc, actual) => acc + actual.valorReal, 0)
        }
    }
    sumarTotales();
    const eliminarProducto = (id) => {
        console.log(id);
        setCarrito(carrito.filter((e) => e.id !== id));
    }


    return (
        <div className="table-responsive">
            {
                alerta && alerta.tipo === 'alerta' && <div className="alert alert-danger" id="alerta">
                    {alerta.mensaje} <IconAlertCircle />
                    <button type="button" className="ms-2 btn-close"
                     onClick={() => document.getElementById('alerta').style.display="none"}
                    />
                </div>
            }

            {
                alerta && alerta.tipo === 'exito' && <div className="alert alert-success" id="exito">
                    {alerta.mensaje} <IconCircleCheck />
                    <button type="button" className="ms-2 btn-close"
                      onClick={()=> document.getElementById('exito').style.display="none"}
                    />
                </div>
            }
            <table className="table table-vcenter">
                <thead>
                    <tr>
                        <th>
                            Articulo*
                        </th>
                        <th>
                            Cantidad*
                        </th>
                        <th>Valor unidad</th>
                        <th>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input className="form-control" type="text"
                                name="articulo"
                                value={articulo}
                                onChange={(e) => handleArticulo(e)} />
                            {articulo}
                        </td>
                        <td>
                            <input className="form-control"
                                type="number"
                                name="cantidad"
                                value={cantidadArticulo}
                                onChange={(e) => handleArticulo(e)} />

                        </td>
                        <td>
                            <input className="form-control"
                                type="number"
                                name="valor_unidad"
                                value={valorUnidad}
                                onChange={(e) => handleArticulo(e)}
                            />

                        </td>
                        <td>
                            <input className="form-control"
                                type="text"
                                name="valor_total"
                                disabled
                                value={valorTotal}
                            />

                        </td>
                        <td>
                            <button
                                className="btn btn-warning"
                                onClick={() => changeTotal()}>
                                <IconCalculator />
                                Calcular
                            </button>
                        </td>
                    </tr>

                    <tr className="text-center">
                        {carrito.length === 0 && (
                            <td>
                                <div>
                                    No hay productos agregados aun...
                                </div>
                            </td>
                        )}
                    </tr>
                    {carrito.length !== 0 && (<>
                        <tr className="h4 tex-center w-100">
                            <td>Productos Agregados</td>
                        </tr>
                    </>)}
                    {carrito.map((item) => (

                        <tr key={item.id}>
                            <td>
                                <input className="form-control" type="text"
                                    name="articulo"
                                    value={item.articulo}
                                    id={item.id}
                                    onChange={(e) => console.log(e.target.value)} />
                            </td>
                            <td>
                                <input className="form-control"
                                    type="number"
                                    name="cantidad"
                                    id={item.id}
                                    value={item.cantidadArticulo}
                                    onChange={(e) => console.log(e.target.value)} />                            </td>
                            <td>
                                <input className="form-control"
                                    type="number"
                                    name="valor_unidad"
                                    value={item.valorUnidad}
                                    onChange={(e) => console.log(e.target.value)} />

                            </td>
                            <td>
                                <input className="form-control"
                                    type="text"
                                    name="valor_total_unidades"
                                    value={item.valorTotal}
                                    disabled
                                    onChange={(e) => console.log(e.target.value, item)} />
                            </td>
                            <td>
                                <button
                                    onClick={() => eliminarProducto(item.id)}
                                    className="btn btn-danger"
                                    data-bs-toggle="tooltip1" data-bs-placement="top" title="Eliminar"
                                >
                                    <IconTrashX />
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            {/* BARRA DE TOTAL*/}
            <div className="btn btn-success">
                Valor Total :
                {
                    typeof valoresTotales === 'number' &&

                    new Intl.NumberFormat('es-CO',
                        { style: 'currency', currency: 'COP' }).format(valoresTotales)
                }

                {
                    typeof valoresTotales !== 'number' && (
                        new Intl.NumberFormat('es-CO',
                            { style: 'currency', currency: 'COP' }).format(0)
                    )
                }
            </div>
            <div className="w-100 text-center">
                <button className="btn btn-primary btn-lg w-50" onClick={() => addArticulo()}>
                    <IconSquarePlus />
                </button>
            </div>
        </div>
    );
}

export default TablaProductos;