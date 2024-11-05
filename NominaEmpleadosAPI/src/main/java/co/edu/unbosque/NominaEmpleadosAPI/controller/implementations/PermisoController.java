package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IPermisoAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.PermisoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PermisoController implements IPermisoAPI {

    private final IService<PermisoDTO, Integer> service;


    public PermisoController(IService<PermisoDTO, Integer> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<?> create(PermisoDTO dto) {
        return null;
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(Integer id, PermisoDTO dto) {
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
