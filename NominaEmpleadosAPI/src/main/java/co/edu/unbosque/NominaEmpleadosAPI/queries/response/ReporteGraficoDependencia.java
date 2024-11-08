package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CantidadDependenciaDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteGraficoDependencia {

    private List<CantidadDependenciaDTO> cantidadDependenciaDTO;

}
