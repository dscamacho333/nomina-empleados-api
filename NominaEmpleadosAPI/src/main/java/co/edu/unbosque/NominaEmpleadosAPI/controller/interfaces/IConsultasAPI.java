package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina1;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api/consultas/v1")
public interface IConsultasAPI {

    @GetMapping("/empleados-ordenados")
    ResponseEntity<ReporteNomina1> listarEmpleadosOrdenados(
            @RequestParam(value = "ordenarPor", defaultValue = "primer_nombre") String ordenarPor);

    @GetMapping("/empleados-por-cargo-dependencia")
    ResponseEntity<ReporteNomina2> listarEmpleadosPorCargoYDependencia(
            @RequestParam(value = "ordenNombre", defaultValue = "asc") String ordenNombre);
}
