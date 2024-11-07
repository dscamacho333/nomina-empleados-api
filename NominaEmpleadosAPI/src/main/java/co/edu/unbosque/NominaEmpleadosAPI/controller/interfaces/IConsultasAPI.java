package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@RequestMapping("/api/consultas/v1")
@PreAuthorize("hasAnyRole('ADMIN','DESARROLLADOR', 'USUARIO')")
public interface IConsultasAPI {

    @GetMapping("/empleados-ordenados")
    ResponseEntity<ReporteNombreDependencia> listarEmpleadosOrdenados(
            @RequestParam(value = "ordenarPor", defaultValue = "primerNombre") String ordenarPor);

    @GetMapping("/empleados-por-cargo-dependencia")
    ResponseEntity<ReporteCargoDependencia> listarEmpleadosPorCargoYDependencia(
            @RequestParam(value = "ordenNombre", defaultValue = "asc") String ordenNombre);

    @GetMapping("/empleados-por-cargo-eps-pension")
    ResponseEntity<ReporteCargoSaludPension> listarEmpleadosPorCargoEpsPension(
            @RequestParam(value = "ordenNombre", defaultValue = "asc") String ordenNombre);

    @GetMapping("/empleado-informacion")
    ResponseEntity<ReporteInformacionIndividual> obtenerInformacionIndividual(@RequestParam("idEmpleado") Integer idEmpleado);

    @GetMapping("/reporte-novedades")
    ResponseEntity<List<ReporteFechaNovedad>> obtenerReporteNovedades(
            @RequestParam("fechaInicio") @DateTimeFormat(pattern = "MM/yyyy") Date fechaInicio,
            @RequestParam("fechaFin") @DateTimeFormat(pattern = "MM/yyyy") Date fechaFin);

    @GetMapping("/novedades-por-fecha-cargo-dependencia")
    ResponseEntity<List<ReporteDetalleNovedad>> obtenerNovedadesPorRangoFechaCargoDependencia(
            @RequestParam("fechaInicio") @DateTimeFormat(pattern = "MM/yyyy") Date fechaInicio,
            @RequestParam("fechaFin") @DateTimeFormat(pattern = "MM/yyyy") Date fechaFin,
            @RequestParam("dependencia") String dependencia,
            @RequestParam("cargo") String cargo);

    @GetMapping("/empleados-por-dependencia")
    ResponseEntity<List<ReporteGraficoDependencia>> obtenerEmpleadosPorDependencia();

    @GetMapping("/empleados-por-cargo")
    ResponseEntity<List<ReporteGraficoCargo>> obtenerEmpleadosPorCargo();

    @GetMapping("/empleados-por-eps")
    ResponseEntity<List<ReporteGraficoEPS>> obtenerEmpleadosPorEPS();

    @GetMapping("/empleados-por-pension")
    ResponseEntity<List<ReporteGraficoPension>> obtenerEmpleadosPorPension();

    @GetMapping("/empleados-por-eps-dependencia")
    ResponseEntity<List<ReporteGraficoEPSDependencia>> obtenerEmpleadosPorEPSyDependencia();

    @GetMapping("/empleados-por-pension-dependencia")
    ResponseEntity<List<ReporteGraficoPensionDependencia>> obtenerEmpleadosPorPensionYDependencia();


}
