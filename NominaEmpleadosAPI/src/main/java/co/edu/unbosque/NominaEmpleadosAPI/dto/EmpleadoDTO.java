package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmpleadoDTO extends DTOBase {

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
    private List<NovedadDTO> novedadesDTO = new ArrayList<>();

}
