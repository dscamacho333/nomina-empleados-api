import React from "react";
import NavBarReporteNomina from "./NavBarReporteNomina";

function ReporteNomina() {
  return (
    <>
      {/* Utiliza el componente NavBarReporteNomina para mostrar la barra de navegación */}
      <NavBarReporteNomina />

      {/* Contenido específico para el reporte de nómina */}
      <div style={{ marginTop: "100px", padding: "20px", textAlign: "center" }}>
        <h2>Reporte de Nómina</h2>
        <p>Reporte de Nómina, incluyendo estadísticas detalladas de cargos y dependecias de los empleados.</p>
      </div>
    </>
  );
}

export default ReporteNomina;
