package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IConsultasAPI;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteCargoSaludPension;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina1;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina2;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNovedad;
import co.edu.unbosque.NominaEmpleadosAPI.queries.service.IConsultas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class ConsultasController implements IConsultasAPI {

    @Autowired
    private IConsultas service;

    @Override
    public ResponseEntity<ReporteNomina1> listarEmpleadosOrdenados(String ordenarPor) {
        ReporteNomina1 reporteNomina1 = service.listarEmpleadosOrdenados(ordenarPor);
        return ResponseEntity.status(HttpStatus.OK).body(reporteNomina1);
    }

    @Override
    public ResponseEntity<ReporteNomina2> listarEmpleadosPorCargoYDependencia(String ordenNombre) {
        ReporteNomina2 reporteNomina2 = service.listarEmpleadosPorCargoYDependencia(ordenNombre);
        return ResponseEntity.status(HttpStatus.OK).body(reporteNomina2);
    }

    @Override
    public ResponseEntity<ReporteCargoSaludPension> listarEmpleadosPorCargoEpsPension(String ordenNombre) {
        ReporteCargoSaludPension reporteCargoSaludPension = service.listarEmpleadosPensionCargoNombre(ordenNombre);
        return ResponseEntity.status(HttpStatus.OK).body(reporteCargoSaludPension);
    }

    @Override
    public ResponseEntity<List<ReporteNovedad>> obtenerReporteNovedades(
            @DateTimeFormat(pattern = "MM/yyyy") Date fechaInicio,
            @DateTimeFormat(pattern = "MM/yyyy") Date fechaFin) {

        List<ReporteNovedad> novedades = service.obtenerNovedadesPorFechas(fechaInicio, fechaFin);
        return ResponseEntity.status(HttpStatus.OK).body(novedades);
    }

}

