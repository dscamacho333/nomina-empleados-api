package co.edu.unbosque.NominaEmpleadosAPI.dto;


import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CargoDTO {

    private Integer id;
    private String nombreCargo;
    private List<EmpleadoDTO> empleadosDTO = new ArrayList<>();

}
