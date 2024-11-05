package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IPermisoRolAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.PermisoRolDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PermisoRolController implements IPermisoRolAPI {

    private final IService<PermisoRolDTO, Integer> service;

    public PermisoRolController(IService<PermisoRolDTO, Integer> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<?> create(PermisoRolDTO dto) {
        return null;
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(Integer id, PermisoRolDTO dto) {
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
