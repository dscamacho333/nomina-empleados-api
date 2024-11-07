package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PensionDTO extends DTOBase{

    private Integer id;
    private String nombrePension;
    private List<EmpleadoDTO> empleadosDTO = new ArrayList<>();
}
