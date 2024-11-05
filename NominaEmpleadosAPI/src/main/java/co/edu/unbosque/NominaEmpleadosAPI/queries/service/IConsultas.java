package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.*;

import java.util.Date;
import java.util.List;

public interface IConsultas {

    ReporteNomina1 listarEmpleadosOrdenados(String criterioOrden);
    ReporteNomina2 listarEmpleadosPorCargoYDependencia(String ordenNombre);
    ReporteCargoSaludPension listarEmpleadosPensionCargoNombre (String ordenNombre);
    List<ReporteNovedad> obtenerNovedadesPorFechas(Date fechaInicio, Date fechaFin);
    List<ReporteDetalleNovedad> obtenerNovedadesPorRangoFechaCargoDependencia(Date fechaInicio, Date fechaFin, String dependencia, String cargo);
}
