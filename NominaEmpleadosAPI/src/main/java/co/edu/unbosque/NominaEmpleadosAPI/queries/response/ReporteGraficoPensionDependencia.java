package co.edu.unbosque.NominaEmpleadosAPI.queries.response;


import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.EmpleadorPorPensionYDependenciaDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteGraficoPensionDependencia {

    private List <EmpleadorPorPensionYDependenciaDTO> empleadorPorPensionYDependenciaDTO;
}
