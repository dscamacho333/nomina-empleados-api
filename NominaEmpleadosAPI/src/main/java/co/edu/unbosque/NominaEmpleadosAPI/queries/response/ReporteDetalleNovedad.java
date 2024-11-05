package co.edu.unbosque.NominaEmpleadosAPI.queries.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReporteDetalleNovedad {

    private String primerNombre;
    private String primerApellido;
    private String nombreCargo;
    private String nombreDependencia;
    private long totalIncapacidades;
    private Date fechaIncapacidadInicio;
    private Date fechaIncapacidadFin;
    private long diasTrabajados;
    private Date vacacionesInicio;
    private Date vacacionesFin;
    private double bonificacion;
    private double transporte;
    private double salarioTotal;
}
