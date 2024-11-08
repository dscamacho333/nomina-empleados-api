package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IAutenticacionAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.auth.AuthLoginRequest;
import co.edu.unbosque.NominaEmpleadosAPI.service.implementations.UserDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AutenticacionController implements IAutenticacionAPI {

    private final UserDetailService service;

    public AutenticacionController(UserDetailService service) {
        this.service = service;
    }


    @Override
    public ResponseEntity<?> login(AuthLoginRequest request) {
        return ResponseEntity
                .status(200)
                .body(service.login(request));
    }
}
