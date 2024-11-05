package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RolUsuarioDTO {

    private Integer id;
    private UsuarioDTO usuarioDTO;
    private RolDTO rolDTO;

}
