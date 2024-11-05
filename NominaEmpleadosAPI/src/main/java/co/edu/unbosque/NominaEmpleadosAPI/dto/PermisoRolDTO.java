package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermisoRolDTO {

    private Integer id;
    private RolDTO rolDTO;
    private PermisoDTO permisoDTO;

}
