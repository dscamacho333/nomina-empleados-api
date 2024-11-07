package co.edu.unbosque.NominaEmpleadosAPI.dto;

import co.edu.unbosque.NominaEmpleadosAPI.entity.enums.PermisoEnum;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermisoDTO extends DTOBase {

    private Integer id;
    private PermisoEnum permisoEnum;

}
