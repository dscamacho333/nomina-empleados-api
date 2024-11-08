package co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CantidadCargoDTO {

    private String cargo;
    private long cantidad;

}
