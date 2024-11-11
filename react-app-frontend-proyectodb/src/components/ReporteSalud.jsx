import React from "react";
import NavBarReporteSaludPension from "./NavBarReporteSaludPension"; // Importa NavBarReporteSaludPension

function ReporteSalud() {
  return (
    <>
      {/* Utiliza NavBarReporteSaludPension */}
      <NavBarReporteSaludPension />

      <div style={{ marginTop: "100px", padding: "20px", textAlign: "center" }}>
        <h2>Reporte de Salud y Pensión</h2>
        <p>
          Reporte de Salud y Pensión,
          incluyendo estadísticas detalladas de salud y datos de pensión de los
          empleados.
        </p>
      </div>
    </>
  );
}

export default ReporteSalud;
