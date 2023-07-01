import { useState } from "react";
import IniciarSesion from "../firebase/IniciarSesion";
import { Link } from "react-router-dom";
import { IconBrandGoogle, IconBrandFacebook } from "@tabler/icons-react"
import GoogleSignIn from "../firebase/GoogleSignIn";
import FbSignIn from "../firebase/FbSignIn";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const {usuario} = useAuth();
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
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor ingresa un correo valido'
            });
            return;
        }

        if (email === '' || password === '') {
            setAlerta({
                tipo: 'error',
                mensaje: 'Todos los campos son obligatorios'
            });

            return;
        }
        try {
            await IniciarSesion(email, password);
            setAlerta({ tipo: 'exito', mensaje: 'Ingreso con exito' })
            setEmail('')
            setPassword('')
        } catch (err) {
            console.log(err);
            let mensaje = "";

            switch (err.code) {
                case "auth/weak-password":
                    mensaje = "La contraseña debe ser de mínimo 6 digitos";
                    setAlerta({
                        tipo: 'error',
                        mensaje
                    });
                    break;
                case "auth/email-already-in-use":
                    mensaje = "Este correo ya está en uso";
                    setAlerta({ tipo: 'error', mensaje });
                    break;

                case "auth/invalid-email":
                    mensaje = "Este correo no es valido";
                    setAlerta({ tipo: 'error', mensaje });
                    break;

                case "auth/wrong-password":
                    mensaje = "Contraseña incorrecta"
                    setAlerta({ tipo: 'error', mensaje });
                    break;
                default:
                    mensaje = err.message
                    setAlerta({ tipo: 'error', mensaje })
                    break;
            }
        };
    }
    return (<>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card text-bg-light mb-3 mt-5">
                        <div className="card-header text-center">
                            <h3>INICIAR SESION</h3>
                        </div>
                        <div className="card-body">
                            <form action="#" onSubmit={(e) => handleSubmit(e)}>
                                {alerta && alerta.tipo === 'error' && (
                                    <>
                                        <div className="alert alert-danger" role="alert">
                                            {alerta.mensaje}!
                                        </div>
                                    </>
                                )}

                                {alerta.tipo === "exito" && (
                                    <div className="alert alert-success" role="alert">
                                        {alerta.mensaje}!
                                    </div>
                                )}
                                <div className="form-group mb-3 p-2">
                                    <label htmlFor="email">USUARIO</label>
                                    <input type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => handleInput(e)}
                                        value={email}
                                        autoComplete="true"
                                        className="form-control" />
                                </div>
                                <div className="form-group mb-3 p-2">
                                    <label htmlFor="password">CONTRASEÑA</label>
                                    <input type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        autoComplete="true"
                                        onChange={(e) => handleInput(e)}
                                    />
                                </div>

                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-success btn-md">INICIAR</button>
                                </div>
                                <small>Otros metodos de iniciar sesión.</small>
                                {
                                    usuario && <Link to="/crear-factura">Ya ingresaste. click aquí.</Link>
                                }
                                <div className="mt-4">
                                    <button className="btn btn-danger mx-2" onClick={async(e)=> await GoogleSignIn(e)}>
                                        <IconBrandGoogle/>
                                    </button>
                                    <button className="btn btn-primary mx-2" onClick={async(e)=> await FbSignIn(e)}>
                                        <IconBrandFacebook/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login;