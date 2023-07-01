import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import BuscarCliente from "../firebase/useBuscarCliente";
import Swal from "sweetalert2";
const ModalBuscarUsuario = ({ cliente, setCliente, setMostrar }) => {
    const [documento, setDocumento] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('')

    let copia = []
    const consultaCliente = async () => {
        try {
            const results = await BuscarCliente(documento);
            results.forEach((c) => {
                if(c.exists()){
                    copia.push({
                        id: c.id,
                        data: c.data()
                    })
                }
            })
            if(!results.empty){
                Swal.fire("Info.","Cliente encontrado.", "success")

            }
            if(results.empty){
                Swal.fire("Info.","Cliente no encontrado.", "warning")
            }
        } catch (error) {
            console.log(error);
        }
        console.log(cliente);
        setDocumento('')
        setNombre('')
        setTelefono('')
        setCliente(copia)
        setMostrar(false)
    }

    return (<>
        <button className="btn btn-secondary  w-auto h-auto" data-bs-toggle="modal" data-bs-target="#buscarCliente">
            <IconSearch size={20} />
            Buscar cliente
        </button>

        { /* Modal -->*/}
        <div className="modal fade" id="buscarCliente" tabIndex="-1" aria-labelledby="buscarClienteLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="buscarClienteLabel">Buscar Cliente</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="form-group mb-2 col">
                                <label className="form-label">
                                    Identificación
                                </label>
                                <input type="text"
                                    className="form-control"
                                    name="documento" placeholder="311-000-555"
                                    value={documento}
                                    onChange={(e) => setDocumento(Number(e.target.value))}
                                />
                            </div>
                            <div className="form-group mb-2 col">
                                <label className="form-label">
                                    Nombre del cliente
                                </label>
                                <input type="text"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Juan Carlos"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2 col">
                                <label className="form-label">
                                    Celular / Telefono
                                </label>
                                <input type="tel"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="321-88-6540"
                                    value={telefono}
                                    onChange={(e) => setTelefono(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        {
                            cliente && cliente.length > 0
                            && <ul className="list-group">
                                {
                                    cliente.map((c) => (
                                        <li key={c.data.userId}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => setMostrar(true)}
                                            style={{ cursor: 'pointer' }}
                                            data-bs-dismiss="modal"
                                        >
                                            {c.data.tipoDocumento}:{c.data.documento} - {c.data.nombre}...
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </div>
                    <div className="modal-footer">

                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={async () => await consultaCliente(documento)}>
                            <IconSearch />
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default ModalBuscarUsuario;