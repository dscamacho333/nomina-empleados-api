package co.edu.unbosque.NominaEmpleadosAPI.dto;


import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DependenciaDTO {

    private Integer id;
    private String nombreDependencia;
    private List<EmpleadoDTO> empleadosDTO = new ArrayList<>();
}
