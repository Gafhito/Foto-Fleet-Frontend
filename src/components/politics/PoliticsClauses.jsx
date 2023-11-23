import "./politics_clauses.css";

export const PoliticsClauses = () => {
  return (
    <div>
        <div>
            <h3 className="text title">Reserva y Pago</h3>
            <ul>
                <li className="text points">Los clientes deben realizar una reserva anticipada para garantizar la disponibilidad del equipo.</li>
                <li className="text points">El pago completo del alquiler se debe realizar antes de la fecha de inicio del período de alquiler.</li>
            </ul>
        </div>
        <div>
            <h3 className="text title">Duración del Alquiler</h3>
            <ul>
                <li className="text points">El período de alquiler comienza en la fecha acordada durante la reserva y finaliza en la fecha de devolución especificada.</li>
                <li className="text points">Se aplicará una tarifa adicional por cada día de retraso en la devolución, a menos que se haya acordado una extensión previa.</li>
            </ul>
        </div>
        <div>
            <h3 className="text title">Condiciones de los Productos</h3>
            <ul>
                <li className="text points">Los clientes deben revisar el equipo al momento de la entrega y notificar cualquier daño o problema de inmediato.</li>
                <li className="text points">Los clientes son responsables de devolver los productos en el mismo estado en que fueron recibidos, salvo el desgaste normal por el uso.</li>
            </ul>
        </div>
        <div>
            <h3 className="text title">Uso Adecuado</h3>
            <ul>
                <li className="text points">El cliente utilizará el equipo únicamente para fines fotográficos y de acuerdo con las especificaciones del fabricante.</li>
                <li className="text points">No está permitido modificar, desarmar o intentar reparar el equipo sin autorización.</li>
            </ul>
        </div>
        <div>
            <h3 className="text title">Pérdida o Daño</h3>
            <ul>
                <li className="text points">El cliente es responsable de cualquier pérdida, robo o daño durante el período de alquiler.</li>
                <li className="text points">Se aplicarán cargos adicionales por reparación o reemplazo, según la evaluación de los daños.</li>
            </ul>
        </div>
        <div>
            <h3 className="text title">Cancelación y Reembolsos</h3>
            <ul>
                <li className="text points">Las cancelaciones deben realizarse con un aviso previo.</li>
                <li className="text points">Se aplicarán políticas de reembolso según los días totales que el equipo haya sido utilizado.</li>
            </ul>
        </div>
        <div>
            <h3 className="text title">Devolución del Equipo</h3>
            <ul>
                <li className="text points">El cliente debe devolver todo el equipo al final del período de alquiler, incluyendo accesorios y estuches originales.</li>
                <li className="text points">La devolución debe realizarse en el local donde fue alquilado originalmente el producto.</li>
            </ul>
        </div>
        <div>
            <h3 className="text title">Responsabilidad del Cliente</h3>
            <ul>
                <li className="text points">El cliente acepta la responsabilidad total por el uso y manejo adecuado del equipo durante el período de alquiler.</li>
            </ul>
        </div>
    </div>
  );
};
