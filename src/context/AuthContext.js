import React,{ useContext, useState, useEffect } from "react";
import {onAuthStateChanged, auth} from "./../firebase/config"
const AuthContext = React.createContext();


// Este es el hook que retorna el context
const useAuth = () => useContext(AuthContext);

// Componente padre que en globa la app y provee del contexto
const AuthProvider = ({children})=>{
    // Estado del usuario
    const [usuario, setUsuario] = useState(AuthContext);
    // Cargando usuario
    const [cargandoUsuario, setCargandoUsuario] = useState();

    // Verificando la carga del usuario
    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth,(user)=>{
            setUsuario(user);
            setCargandoUsuario(false)
        })
        return () => {
            cancelarSuscripcion()
        };
    }, []);

    return (
        <AuthContext.Provider value={{usuario, setUsuario}}>
            {!cargandoUsuario && children}
        </AuthContext.Provider>
    )
}
export {AuthContext, AuthProvider, useAuth}