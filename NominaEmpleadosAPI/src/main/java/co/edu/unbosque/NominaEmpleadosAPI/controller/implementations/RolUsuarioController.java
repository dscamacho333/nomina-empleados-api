package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IRolUsuarioAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.RolUsuarioDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RolUsuarioController implements IRolUsuarioAPI {

    private final IService<RolUsuarioDTO, Integer> service;

    public RolUsuarioController(IService<RolUsuarioDTO, Integer> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<?> create(RolUsuarioDTO dto) {
        return null;
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(Integer id, RolUsuarioDTO dto) {
        return null;
    }

    @Override
    public ResponseEntity<?> delete(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<?> readAll() {
        return null;
    }
}
