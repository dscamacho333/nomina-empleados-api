package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmpleadoDTO {

    private Integer id;
    private String primerApellido;
    private String segundoApellido;
    private String primerNombre;
    private String segundoNombre;
    private Date fechaIngreso;
    private DependenciaDTO dependenciaDTO;
    private CargoDTO cargoDTO;
    private EPSDTO epsDTO;
    private ARLDTO arlDTO;
    private PensionDTO pensionDTO;
    private double sueldo;


}
