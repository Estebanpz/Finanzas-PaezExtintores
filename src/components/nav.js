import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Salir from "../firebase/Salir";
const Nav = () => {
    const { usuario } = useAuth();
    return (<header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="#">Finanzas Páez</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="container">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/crear-factura">Facturas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/crear-compra">Compras</Link>
                            </li>
                            {
                                !usuario && (
                                    <>
                                        <li className="nav-item">
                                            <Link to='/crear-cuenta' className="nav-link" >Registrarme</Link>
                                        </li>
                                        <li>
                                            <Link to='/iniciar-sesion' className="nav-link" >Inciar Sesion</Link>
                                        </li>

                                    </>
                                )
                            }
                            {
                                usuario && (<li>
                                    <Link to='/iniciar-sesion' className="nav-link" onClick={async () => await Salir()}>Salir</Link>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>);
}

export default Nav;
