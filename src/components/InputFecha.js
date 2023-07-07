import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { IconCalendarDue } from "@tabler/icons-react";
const InputFecha = ({ fecha, cambiarFecha, setCarrito, carrito }) => {
    //const FORMAT = "MM/dd/yyyy";
    let footer = <p>Por favor selecciona la fecha de la venta.</p>;
    if (fecha) {
        footer = <p>Seleccionaste {format(fecha, "dd 'de' MMM 'del' yyyy ",{locale:es})}.</p>;
    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fechaModal">
                <IconCalendarDue className="mx-2" />
                Fecha
            </button>

            <div className="modal fade" id="fechaModal" tabIndex="-1" aria-labelledby="fechaModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="fechaModalLabel">Selecione la fecha de venta.</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <DayPicker
                                mode="single"
                                selected={fecha}
                                onSelect={cambiarFecha}
                                footer={footer}
                                locale={es}
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => cambiarFecha('')}>Cancelar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputFecha;