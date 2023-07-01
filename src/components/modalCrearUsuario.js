import { IconPlus } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "./../context/AuthContext";
import CrearCliente from "../firebase/CrearCliente";
import Swal from 'sweetalert2'
const ModalCrearUsuario = () => {
    const { usuario: { uid } } = useAuth();
    useEffect(() => {
        if (uid)
            setCliente({ ...cliente, userId: uid || '' })
        return () => {
            setCliente({ ...cliente, userId: '' })
        };
    }, [uid]);
    const initialState = {
        Documento: '',
        numeroDocumento: 0,
        userId: '',
        Nombre: '',
        Correo: '',
        Contacto: '',
        Departamento: '',
        Ciudad: '',
        Direccion: '',
        Observaciones: ''
    }
    const [cliente, setCliente] = useState(initialState);

    // Estados para cada input
    const [tipoDocumento, setTipoDocumento] = useState('CC')
    const [documento, setDocumento] = useState(0);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contacto, setContacto] = useState(0);
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [observaciones, setObservaciones] = useState('')
    let valido = false;

    const validar = async (e, cliente) => {
        e.preventDefault();
        let validarTelefono = new RegExp(/^\S[0-9]{8,10}$/);
        let validarNombre = new RegExp(/^[a-zA-Z]{2,254}/g);

        if (!validarNombre.test(nombre)) {
            valido = false;
            console.log('error nombre');
        } else {
            valido = true;
            setCliente({ ...cliente, Nombre: nombre })
        }

        if (!validarTelefono.test(contacto)) {
            valido = false;
            console.log('error telefono');
        } else {
            valido = true;
            setCliente({ ...cliente, Contacto: contacto })
        }

        if (tipoDocumento === 'CC' || tipoDocumento === 'NIT' || tipoDocumento === 'PPT') {
            setCliente({ ...cliente, tipoDocumento: tipoDocumento })
        }

        if (!validarTelefono.test(documento)) {
            valido = false;
            console.log('error numero de documento');
        } else {
            valido = true;
            setCliente({ ...cliente, numeroDocumento: documento })
        }

        if (correo.length <= 0) {
            valido = false;
        } else {
            valido = true;
            setCliente({ ...cliente, Correo: correo })
        }

        if (departamento.length <= 0) {
            valido = false;
        } else {
            valido = true;
            setCliente({ ...cliente, Departamento: departamento })
        }

        if (ciudad.length <= 0) {
            valido = false;
        } else {
            valido = true;
            setCliente({ ...cliente, Ciudad: ciudad });
        }

        if (direccion.length <= 0) {
            valido = false;
        } else {
            valido = true;
            setCliente({ ...cliente, Direccion: direccion, Observaciones: observaciones })
        }

        await crearCliente()
    }

    const crearCliente = async () => {
        const result = await Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        });
        if (result.isConfirmed) {
            if (valido) {
                try {
                    await CrearCliente({
                        userId: uid,
                        tipoDocumento,
                        documento,
                        nombre,
                        contacto,
                        correo,
                        departamento,
                        ciudad,
                        direccion,
                        observaciones
                    })
                    Swal.fire('Saved!', 'cliente guardado', 'success')
                    setTipoDocumento('');
                    setDocumento(0);
                    setNombre('')
                    setContacto('')
                    setCorreo('')
                    setDepartamento('')
                    setCiudad('')
                    setDireccion('')
                    setObservaciones('')
                } catch (error) {
                    console.log(error);
                }
            }else{
                Swal.fire("Error", "verifique los campos", "error")
            }
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', 'cliente no guardado', 'info')
            setTipoDocumento('');
                    setDocumento(0);
                    setNombre('')
                    setContacto('')
                    setCorreo('')
                    setDepartamento('')
                    setCiudad('')
                    setDireccion('')
                    setObservaciones('')
        }
    }

    return (<>
        <button className="btn w-auto h-auto"
            data-bs-toggle="modal" data-bs-target="#exampleModal"
            style={{ background: '#206BC4', color: '#fff' }}>
            <IconPlus size={20} />
            Crear cliente
        </button>

        {/* MODAL CREAR USUARIO-->*/}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog  modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del cliente</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="my-3" onSubmit={(e) => validar(e, cliente)}>
                            <div className="form-group mb-2">
                                <label className="form-label">Tipo de Identificación*</label>
                                <select name="tipoIdentificacion"
                                    className="form-select"
                                    onChange={(e) => setTipoDocumento(e.target.value)}
                                    value={tipoDocumento}
                                >
                                    <option value="NIT">NIT</option>
                                    <option value="CC">CC</option>
                                    <option value="PPT">PPT</option>
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">
                                    Documento*
                                </label>
                                <input type="tel"
                                    className="form-control"
                                    name="documento"
                                    placeholder="123456-8"
                                    autoComplete="true"
                                    value={documento}
                                    onChange={(e) => setDocumento(Number(e.target.value))}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Nombre completo*
                                </label>
                                <input type="text" className="form-control"
                                    name="nombre"
                                    value={nombre}
                                    autoComplete="true"
                                    onChange={(e) => setNombre(e.target.value)} />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">
                                    Correo electronico*
                                </label>
                                <input type="email"
                                    className="form-control"
                                    name="correo"
                                    placeholder="paez@gmail.com"
                                    autoComplete="true"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)} />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">
                                    Teléfono / Celular*
                                </label>
                                <input type="tel"
                                    className="form-control"
                                    name="telefono"
                                    placeholder="322-000-0000"
                                    autoComplete="true"
                                    value={contacto}
                                    onChange={(e) => setContacto(Number(e.target.value))}
                                />
                            </div>
                            <hr />
                            <h4>Localización</h4>
                            <div className="form-group">
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Departamento*
                                    </label>
                                    <input type="text"
                                        className="form-control"
                                        name="departamento"
                                        placeholder="Antioquia"
                                        autoComplete="true"
                                        value={departamento}
                                        onChange={(e) => setDepartamento(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Ciudad*
                                    </label>
                                    <input type="text" className="form-control" name="ciudad" placeholder="Antioquia"
                                        autoComplete="true"
                                        value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Direccion de residencia*
                                    </label>
                                    <input type="text"
                                        className="form-control"
                                        name="direccion"
                                        placeholder="Kra / Calle #00-00"
                                        autoComplete="true"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Observaciones
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="observaciones"
                                        cols="30"
                                        rows="2"
                                        value={observaciones} onChange={(e) => setObservaciones(e.target.value)}>
                                    </textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-primary">Crear cliente</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ModalCrearUsuario;