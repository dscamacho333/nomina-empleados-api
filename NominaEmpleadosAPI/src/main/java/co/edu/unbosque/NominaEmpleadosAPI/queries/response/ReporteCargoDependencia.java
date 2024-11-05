package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CargoDependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CantidadDependenciaDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteCargoDependencia {

    private List<EmpleadoDTO> empleadosDTO;
    private List<CargoDependenciaDTO> cargoDependenciasDTO;
    private List<CantidadDependenciaDTO> dependenciasDTO;
    private long cantidadTotalEmpleados;
}
