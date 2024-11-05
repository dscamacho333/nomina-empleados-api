package co.edu.unbosque.NominaEmpleadosAPI.dto;

import co.edu.unbosque.NominaEmpleadosAPI.entity.enums.PermisoEnum;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermisoDTO {

    private Integer id;
    private PermisoEnum permisoEnum;

}
