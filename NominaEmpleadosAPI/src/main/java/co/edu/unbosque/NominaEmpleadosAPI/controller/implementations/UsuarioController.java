package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IUsuarioAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.UsuarioDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController implements IUsuarioAPI {

    private final IService<UsuarioDTO, Integer> service;

    public UsuarioController(IService<UsuarioDTO, Integer> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<?> create(UsuarioDTO dto) {
        service.create(dto);
        return ResponseEntity
                .status(201)
                .body(dto);
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<?> update(Integer id, UsuarioDTO dto) {
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
