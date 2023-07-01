const Cliente = ({ cliente, mostrar }) => {
    return (
        <>
            {mostrar &&
                <h4>Cliente seleccionado:</h4>
            }
            {
                mostrar &&
                cliente.map((c) => (
                    <select key={c.data.userId} className="form-select">
                        <option>
                            {c.data.nombre} - {c.data.tipoDocumento}:{c.data.documento} - Ciudad:{c.data.ciudad}/{c.data.departamento}
                        </option>
                    </select>

                ))
            }
        </>
    )

}

export default Cliente;