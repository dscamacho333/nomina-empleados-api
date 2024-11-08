package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CantidadEPSDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteGraficoEPS {

    private List<CantidadEPSDTO> cantidadEPSDTO;
}
