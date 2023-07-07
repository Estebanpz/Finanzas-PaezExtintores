import { useState } from "react";
import { CrearUsuario } from "../firebase/CrearUsuario";
import { Link, useNavigate } from "react-router-dom";
import { IconBrandFacebook, IconBrandGoogle, IconShieldFilled } from "@tabler/icons-react";
import GoogleSignIn from "../firebase/GoogleSignIn";
import FbSignIn from "../firebase/FbSignIn";
import Swal from "sweetalert2";
const SingUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [alerta, setAlerta] = useState({});

    const handleInput = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            case "confirmpassword":
                setConfirmPassword(e.target.value)
                break;
            default:
                console.log(e);
                break;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('click');
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if (!expresionRegular.test(email)) {
            Swal.fire("Info", 'Por favor ingresa un correo valido', "question")
            return;
        }

        if (email === '' || password === '' || confirmpassword === '') {
            Swal.fire("Info", 'Todos los campos son obligatorios', "info")
            return;
        }

        if (password !== confirmpassword) {
            setAlerta({ tipo: 'error', mensaje: 'Las contraseñan no coinciden' })
            setPassword('')
            Swal.fire("Info", alerta.mensaje, "warning")
            return;
        }

        try {
            await CrearUsuario(email, password)
            setAlerta({ tipo: 'exito', mensaje: 'Usuario creado con exito' })
            Swal.fire("Exito", "Usuario creado con exito", "success")
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            navigate('/iniciar-sesion')
        } catch (err) {
            console.log(err);
            switch (err.code) {
                case "auth/weak-password":
                    Swal.fire("Error.", "La contraseña debe ser de mínimo 6 digitos", "error")
                    break;
                case "auth/email-already-in-use":
                    Swal.fire("Error.", "este correo ya esta en uso.", "error")
                    break;

                case "auth/invalid-email":
                    Swal.fire("Error.", "Este correo no es valido.", "error")
                    break;
                default:
                    Swal.fire("error", "Lo sentimos en este momento no podemos procesar tu solicitud.", "error")
                    break;
            }
        };
    }

    return (
        <>
            <div className="container login w-75 bg-light my-1 rounded shadow h-100">
                <div className="row align-items-stretch">
                <div className="col bg d-sm-none d-md-none d-xl-block">
                    
                    </div>
                    <div className="col">
                        <div className="text-end">
                            <IconShieldFilled style={{ color: 'red' }} size={48} />
                        </div>
                        <h2 className="fw-bold text-center py-5">Registro</h2>
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
                            <div className="mb-2">
                                <label htmlFor="confirmpassword" className="form-label">Confirmar contraseña</label>
                                <input type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    className="form-control"
                                    value={confirmpassword}
                                    autoComplete="true"
                                    onChange={(e) => handleInput(e)}
                                />
                            </div>
                            <div className="d-grid">
                                <input type="submit" className="btn btn-primary" value="Crear cuenta" />
                            </div>
                            <div className="my-3">
                                <span>Tienes cuenta?<Link to="/iniciar-sesion">Inicia Sesión</Link></span>
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
    );
}

export default SingUp;