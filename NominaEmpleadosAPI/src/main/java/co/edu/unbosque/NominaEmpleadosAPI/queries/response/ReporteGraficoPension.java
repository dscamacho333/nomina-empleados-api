package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CantidadPensionDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteGraficoPension {

   private List<CantidadPensionDTO> cantidadPensionDTO;

}
