package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class NovedadDTO {

    private Integer id;
    private EmpleadoDTO empleadoDTO;
    private int numeroDias;
    private double bonificacion;
    private double transporte;
}
