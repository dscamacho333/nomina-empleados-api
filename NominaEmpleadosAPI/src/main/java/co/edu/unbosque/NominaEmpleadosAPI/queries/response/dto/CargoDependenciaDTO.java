package co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CargoDependenciaDTO {

    private String cargo;
    private String dependencia;
    private Long cantidad;
}
