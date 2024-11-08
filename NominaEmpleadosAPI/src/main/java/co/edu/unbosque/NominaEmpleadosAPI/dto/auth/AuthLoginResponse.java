package co.edu.unbosque.NominaEmpleadosAPI.dto.auth;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonPropertyOrder({"usuario", "mensaje" ,  "jwtToken" , "status"})
public class AuthLoginResponse {

    private String usuario;
    private String mensaje;
    private String jwtToken;
    private boolean status;

}
