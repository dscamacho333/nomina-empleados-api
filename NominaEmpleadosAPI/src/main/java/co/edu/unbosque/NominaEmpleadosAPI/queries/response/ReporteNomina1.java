package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteNomina1 {

    private List<EmpleadoDTO> empleadosDTO;
    private long cantidadTotalEmpleados;
}
