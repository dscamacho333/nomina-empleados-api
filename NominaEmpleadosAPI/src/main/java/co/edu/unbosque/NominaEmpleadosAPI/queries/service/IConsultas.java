package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.*;

import java.util.Date;
import java.util.List;

public interface IConsultas {

    ReporteNombreDependencia listarEmpleadosOrdenados(String criterioOrden);
    ReporteCargoDependencia listarEmpleadosPorCargoYDependencia(String ordenNombre);
    ReporteCargoSaludPension listarEmpleadosPensionCargoNombre (String ordenNombre);
    ReporteInformacionIndividual obtenerInformacionIndividual(Integer idEmpleado);
    List<ReporteFechaNovedad> obtenerNovedadesPorFechas(Date fechaInicio, Date fechaFin);
    List<ReporteDetalleNovedad> obtenerNovedadesPorRangoFechaCargoDependencia(Date fechaInicio, Date fechaFin, String dependencia, String cargo);
    List<ReporteGraficoDependencia> obtenerEmpleadosPorDependencia ();
    List<ReporteGraficoCargo> obtenerEmpleadosPorCargo();
    List<ReporteGraficoEPS> obtenerEmpleadosPorEPS();
    List<ReporteGraficoPension> obtenerEmpleadosPorPension ();
    List<ReporteGraficoEPSDependencia> obtenerEmpleadosPorEPSyDependencia();
    List<ReporteGraficoPensionDependencia> obtenerEmpleadosPorPensionYDependencia();
    List<String> obtenerCargosPorDependencia(String nombreDependencia);
}
