package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina1;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina2;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteCargoSaludPension;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNovedad;

import java.util.Date;
import java.util.List;

public interface IConsultas {

    ReporteNomina1 listarEmpleadosOrdenados(String criterioOrden);
    ReporteNomina2 listarEmpleadosPorCargoYDependencia(String ordenNombre);
    ReporteCargoSaludPension listarEmpleadosPensionCargoNombre (String ordenNombre);
    List<ReporteNovedad> obtenerNovedadesPorFechas(Date fechaInicio, Date fechaFin);
}
