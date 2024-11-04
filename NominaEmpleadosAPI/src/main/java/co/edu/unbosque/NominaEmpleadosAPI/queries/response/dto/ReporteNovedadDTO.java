package co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteNovedadDTO {

    private String primerNombre;
    private String primerApellido;
    private int numeroDias;
    private Date fechaInicioVacaciones;
    private Date fechaTerminacionVacaciones;
    private Date fechaInicioIncapacidad;
    private Date fechaTerminacionIncapacidad;
}
