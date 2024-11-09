package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IConsultasAPI;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.*;
import co.edu.unbosque.NominaEmpleadosAPI.queries.service.IConsultas;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class ConsultasController implements IConsultasAPI {

    private final IConsultas service;

    public ConsultasController(IConsultas service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<ReporteNombreDependencia> listarEmpleadosOrdenados(String ordenarPor) {
        ReporteNombreDependencia reporteNombreDependencia = service.listarEmpleadosOrdenados(ordenarPor);
        return ResponseEntity.status(HttpStatus.OK).body(reporteNombreDependencia);
    }

    @Override
    public ResponseEntity<ReporteCargoDependencia> listarEmpleadosPorCargoYDependencia(String ordenNombre) {
        ReporteCargoDependencia reporteCargoDependencia = service.listarEmpleadosPorCargoYDependencia(ordenNombre);
        return ResponseEntity.status(HttpStatus.OK).body(reporteCargoDependencia);
    }

    @Override
    public ResponseEntity<ReporteCargoSaludPension> listarEmpleadosPorCargoEpsPension(String ordenNombre) {
        ReporteCargoSaludPension reporteCargoSaludPension = service.listarEmpleadosPensionCargoNombre(ordenNombre);
        return ResponseEntity.status(HttpStatus.OK).body(reporteCargoSaludPension);
    }

    @Override
    public ResponseEntity<ReporteInformacionIndividual> obtenerInformacionIndividual(Integer idEmpleado) {
        ReporteInformacionIndividual reporte = service.obtenerInformacionIndividual(idEmpleado);
        return ResponseEntity.status(HttpStatus.OK).body(reporte);
    }

    @Override
    public ResponseEntity<List<ReporteFechaNovedad>> obtenerReporteNovedades(Date fechaInicio, Date fechaFin) {
        List<ReporteFechaNovedad> novedades = service.obtenerNovedadesPorFechas(fechaInicio, fechaFin);
        return ResponseEntity.status(HttpStatus.OK).body(novedades);
    }

    @Override
    public ResponseEntity<List<ReporteDetalleNovedad>> obtenerNovedadesPorRangoFechaCargoDependencia(Date fechaInicio, Date fechaFin, String dependencia, String cargo) {
        List<ReporteDetalleNovedad> reporteNovedades = service.obtenerNovedadesPorRangoFechaCargoDependencia(fechaInicio, fechaFin, dependencia, cargo);
        return ResponseEntity.status(HttpStatus.OK).body(reporteNovedades);
    }

    @Override
    public ResponseEntity<List<ReporteGraficoDependencia>> obtenerEmpleadosPorDependencia() {
        List<ReporteGraficoDependencia> reporteDependencia = service.obtenerEmpleadosPorDependencia();
        return ResponseEntity.status(HttpStatus.OK).body(reporteDependencia);
    }

    @Override
    public ResponseEntity<List<ReporteGraficoCargo>> obtenerEmpleadosPorCargo() {
        List<ReporteGraficoCargo> reporteCargo = service.obtenerEmpleadosPorCargo();
        return ResponseEntity.status(HttpStatus.OK).body(reporteCargo);
    }

    @Override
    public ResponseEntity<List<ReporteGraficoEPS>> obtenerEmpleadosPorEPS() {
        List<ReporteGraficoEPS> reporteEPS = service.obtenerEmpleadosPorEPS();
        return ResponseEntity.status(HttpStatus.OK).body(reporteEPS);
    }

    @Override
    public ResponseEntity<List<ReporteGraficoPension>> obtenerEmpleadosPorPension() {
        List<ReporteGraficoPension> reportePension = service.obtenerEmpleadosPorPension();
        return ResponseEntity.status(HttpStatus.OK).body(reportePension);
    }

    @Override
    public ResponseEntity<List<ReporteGraficoEPSDependencia>> obtenerEmpleadosPorEPSyDependencia() {
        List<ReporteGraficoEPSDependencia> reporteEPSDependencia = service.obtenerEmpleadosPorEPSyDependencia();
        return ResponseEntity.status(HttpStatus.OK).body(reporteEPSDependencia);
    }

    @Override
    public ResponseEntity<List<ReporteGraficoPensionDependencia>> obtenerEmpleadosPorPensionYDependencia() {
        List<ReporteGraficoPensionDependencia> reporte = service.obtenerEmpleadosPorPensionYDependencia();
        return ResponseEntity.status(HttpStatus.OK).body(reporte);
    }

    @Override
    public ResponseEntity<List<String>> obtenerCargosPorDependencia(String nombreDependencia) {
        List<String> cargos = service.obtenerCargosPorDependencia(nombreDependencia);
        return ResponseEntity.ok(cargos);
    }

}
