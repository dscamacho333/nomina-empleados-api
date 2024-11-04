package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CargoDependenciaDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteNomina2 {

    private List<EmpleadoDTO> empleadosDTO;
    private List<CargoDependenciaDTO> cargoDependenciasDTO;
    private long cantidadEmpleados;
}
