package co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmpleadosPorEPSyDependenciaDTO {

    private String eps;
    private String dependencia;
    private Long cantidad;
}

