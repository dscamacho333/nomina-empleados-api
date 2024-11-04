package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NovedadDTO {

    private Integer id;
    private EmpleadoDTO empleadoDTO;
    private int numeroDias;
    private double bonificacion;
    private double transporte;
    private List<VacacionesDTO> vacacionesDTO = new ArrayList<>();
    private List<IncapacidadDTO> incapacidadesDTO = new ArrayList<>();

}
