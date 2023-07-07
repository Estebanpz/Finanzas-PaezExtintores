import { useState } from "react";
import IniciarSesion from "../firebase/IniciarSesion";
import { Link } from "react-router-dom";
import { IconBrandGoogle, IconBrandFacebook, IconShieldFilled } from "@tabler/icons-react"
import GoogleSignIn from "../firebase/GoogleSignIn";
import FbSignIn from "../firebase/FbSignIn";
import Swal from "sweetalert2";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleInput = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            default:
                console.log(e);
                break;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if (!expresionRegular.test(email)) {
            Swal.fire("Info.", "Ingrese un correo valido", "info")
            return;
        }

        if (email === '' || password === '') {
            Swal.fire("Info.", "Todos los campos son validos.", "warning")
            return;
        }
        try {
            await IniciarSesion(email, password);
            Swal.fire("Exito", "Ha ingresado correctamente.", "success")
            setEmail('')
            setPassword('')
        } catch (err) {
            console.log(err);
            switch (err.code) {
                case "auth/weak-password":
                    Swal.fire("Error.", "La contraseña debe ser de mínimo 6 digitos", "error")
                    break;
                case "auth/email-already-in-use":
                    Swal.fire("Error", "Este correo ya está en uso", "info")
                    break;

                case "auth/invalid-email":
                    Swal.fire("Error", "Este correo no es valido", "question");
                    break;

                case "auth/wrong-password":
                    Swal.fire("Info", "La contraseña es incorrecta", "warning")
                    break;
                default:
                    Swal.fire("Error", err.message, "error")
                    break;
            }
        };
    }

    return (<>
        <div className="container login w-75 bg-light my-1 rounded shadow h-100">
            <div className="row align-items-stretch">
                <div className="col bg d-sm-none d-md-none d-xl-block">

                </div>
                <div className="col">
                    <div className="text-end">
                        <IconShieldFilled style={{ color: 'red' }} size={48} />
                    </div>
                    <h2 className="fw-bold text-center py-5">Bienvenido</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Correo Electronico</label>
                            <input type="email"
                                name="email"
                                id="email"
                                onChange={(e) => handleInput(e)}
                                value={email}
                                autoComplete="true"
                                className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">CONTRASEÑA</label>
                            <input type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={password}
                                autoComplete="true"
                                onChange={(e) => handleInput(e)}
                            />
                        </div>
                        <div className="d-grid">
                            <input type="submit" className="btn btn-primary" value="Iniciar Sesion" />
                        </div>
                        <div className="my-3">
                            <span>No tienes cuenta? <Link to="/crear-cuenta">Regístrate</Link></span>
                            <br />
                            <span><Link>Recuperar Contraseña</Link></span>
                        </div>
                    </form>

                    {/* LOGIN CON REDES SOCIALES*/}
                    <div className="container w-100 my-5">
                        <div className="row text-center">
                            <div className="col-12">
                                Iniciar Sesión
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-outline-danger w-100 my-1" onClick={async (e) => await GoogleSignIn(e)}>
                                        <div className="row align-items-center">
                                            <div className="col-2">
                                                <IconBrandGoogle size={32} />
                                            </div>
                                            <div className="col-10 text-center">
                                                Google
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="col">
                                    <button className="btn btn-outline-primary w-100 my-1" onClick={async (e) => await FbSignIn(e)}>
                                        <div className="row align-items-center">
                                            <div className="col-2">
                                                <IconBrandFacebook size={32} />
                                            </div>
                                            <div className="col-10 text-center">
                                                Facebook
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login;