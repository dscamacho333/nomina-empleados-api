package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

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
}
