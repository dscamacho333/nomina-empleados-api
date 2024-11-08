package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ARLDTO  extends DTOBase{

    private Integer id;
    private String nombreARL;
    private List<EmpleadoDTO> empleadosDTO = new ArrayList<>();

}
