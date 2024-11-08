package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.auth.AuthLoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/auth/v1")
@PreAuthorize("permitAll()")
public interface IAutenticacionAPI {

    @PostMapping("/log-in")
    ResponseEntity<?> login(@RequestBody AuthLoginRequest request);


}
