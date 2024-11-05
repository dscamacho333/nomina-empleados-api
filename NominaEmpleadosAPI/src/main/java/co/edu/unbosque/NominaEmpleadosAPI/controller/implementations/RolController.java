package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IRolAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.RolDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RolController implements IRolAPI {

    private final IService<RolDTO, Integer> service;

    public RolController(IService<RolDTO, Integer> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<?> create(RolDTO dto) {
        return null;
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(Integer id, RolDTO dto) {
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
