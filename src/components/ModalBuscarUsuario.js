import { IconSearch, IconPlus, IconShoppingCart } from "@tabler/icons-react";
const ModalBuscarUsuario = () => {
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
                                <input type="text" className="form-control" name="documento" placeholder="311-000-555" />
                            </div>
                            <div className="form-group mb-2 col">
                                <label className="form-label">
                                    Nombre del cliente
                                </label>
                                <input type="text" className="form-control" name="nombre" placeholder="Juan Carlos" />
                            </div>
                            <div className="form-group mb-2 col">
                                <label className="form-label">
                                    Celular / Telefono
                                </label>
                                <input type="tel" className="form-control" name="nombre" placeholder="321-88-6540" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary">
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