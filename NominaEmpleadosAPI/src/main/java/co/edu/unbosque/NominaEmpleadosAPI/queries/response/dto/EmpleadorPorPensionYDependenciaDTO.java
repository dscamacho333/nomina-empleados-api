package co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmpleadorPorPensionYDependenciaDTO {

    private String pension;
    private String dependencia;
    private Long cantidad;
}
