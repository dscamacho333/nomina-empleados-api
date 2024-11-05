package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteInformacionIndividual {

    private String primerNombre;
    private String primerApellido;
    private Double sueldo;
    private String nombreCargo;
    private String nombreDependencia;
    private String nombreEPS;
    private String nombrePension;
    private int diasTrabajados;
    private Double bonificacion;
    private Double transporte;
    private Date vacacionesInicio;
    private Date vacacionesFin;
    private Date incapacidadInicio;
    private Date incapacidadFin;
}
