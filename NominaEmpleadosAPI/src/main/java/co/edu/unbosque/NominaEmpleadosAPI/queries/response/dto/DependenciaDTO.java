package co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DependenciaDTO {

    private String dependencia;
    private long cantidad;
}
