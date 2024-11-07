package co.edu.unbosque.NominaEmpleadosAPI.dto;

import co.edu.unbosque.NominaEmpleadosAPI.entity.enums.RolEnum;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolDTO extends DTOBase{

    private Integer id;
    private RolEnum rolEnum;
    private Set<PermisoRolDTO> permisosDTO = new HashSet<>();
}
