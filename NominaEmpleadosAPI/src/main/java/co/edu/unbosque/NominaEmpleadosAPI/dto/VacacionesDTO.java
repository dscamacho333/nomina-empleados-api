package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class VacacionesDTO {

    private Integer id;
    private NovedadDTO novedad;
    private int numeroDias;
    private Date fechaInicio;
    private Date fechaTerminacion;
}
