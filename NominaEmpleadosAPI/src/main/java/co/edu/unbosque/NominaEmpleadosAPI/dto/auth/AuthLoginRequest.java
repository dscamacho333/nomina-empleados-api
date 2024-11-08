package co.edu.unbosque.NominaEmpleadosAPI.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthLoginRequest {

    private String usuario;
    private String contrasenia;

}
