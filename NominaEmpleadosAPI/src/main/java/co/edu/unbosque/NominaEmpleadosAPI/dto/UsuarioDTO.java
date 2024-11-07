package co.edu.unbosque.NominaEmpleadosAPI.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO extends DTOBase {

    private Integer id;
    private String usuario;
    private String contrasenia;
    private boolean estaHabilitado;
    private boolean cuentaNoExpirada;
    private boolean cuentaNoBloqueada;
    private boolean credencialesNoExpiradas;
    private Set<RolUsuarioDTO> rolesDTO = new HashSet<>();

}
