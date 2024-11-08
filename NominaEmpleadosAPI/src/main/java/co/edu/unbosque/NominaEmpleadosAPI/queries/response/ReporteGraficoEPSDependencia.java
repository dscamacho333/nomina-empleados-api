package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.EmpleadosPorEPSyDependenciaDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteGraficoEPSDependencia {

   private List<EmpleadosPorEPSyDependenciaDTO> empleadosPorEPSyDependenciaDTO;

}
