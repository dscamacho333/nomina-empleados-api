package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ARLDTO {

    private Integer id;
    private String nombreARL;
    private List<EmpleadoDTO> empleadosDTO = new ArrayList<>();

}
