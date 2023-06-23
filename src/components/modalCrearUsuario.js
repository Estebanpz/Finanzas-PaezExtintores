import { IconPlus } from "@tabler/icons-react";

const ModalCrearUsuario = () => {
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
                        <form className="my-3">
                            <div className="form-group mb-2">
                                <label className="form-label">Tipo de Identificación*</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option defaultValue="CC">Tipo de identificación</option>
                                    <option value="1">NIT</option>
                                    <option value="2">CC</option>
                                    <option value="3">PPT</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    Nombre completo*
                                </label>
                                <input type="text" className="form-control" name="nombre" />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">
                                    Correo electronico*
                                </label>
                                <input type="email" className="form-control" name="correo" placeholder="paez@gmail.com" />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">
                                    Teléfono / Celular
                                </label>
                                <input type="tel" className="form-control" name="telefono" placeholder="322-000-0000" />
                            </div>
                            <hr />
                            <h4>Localización</h4>
                            <div className="form-group">
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Departamento*
                                    </label>
                                    <input type="text" className="form-control" name="departamento" placeholder="Antioquia" />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Ciudad*
                                    </label>
                                    <input type="text" className="form-control" name="ciudad" placeholder="Antioquia" />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Direccion de residencia*
                                    </label>
                                    <input type="text" className="form-control" name="direccion" placeholder="Kra / Calle #00-00" />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        Observaciones
                                    </label>
                                    <textarea className="form-control" name="observaciones" cols="30" rows="2"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary">Crear cliente</button>

                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ModalCrearUsuario;