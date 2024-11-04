package co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CantidadDependenciaDTO {

    private String dependencia;
    private long cantidad;
}
