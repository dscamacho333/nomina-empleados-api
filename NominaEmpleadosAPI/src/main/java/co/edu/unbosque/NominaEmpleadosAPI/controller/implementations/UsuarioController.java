package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IUsuarioAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.UsuarioDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.implementations.UsuarioService;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsuarioController implements IUsuarioAPI {

    private final IService<UsuarioDTO, Integer> service;

    @Autowired
    private UsuarioService usuarioService;

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
        return ResponseEntity
                .status(200)
                .body(service.read(id));
    }

    @Override
    public ResponseEntity<?> update(Integer id, UsuarioDTO dto) {
        service.update(id,dto);
        return ResponseEntity
                .status(200)
                .body(dto);
    }

    @Override
    public ResponseEntity<?> delete(Integer id) {
        service.delete(id);
        return ResponseEntity
                .status(204)
                .build();
    }

    @Override
    public ResponseEntity<?> readAll() {
        return ResponseEntity
                .status(200)
                .body(service.readAll());
    }

    @Override
    public ResponseEntity<List<UsuarioDTO>> listarUsuariosSinRol() {
        List<UsuarioDTO> usuariosSinRol = usuarioService.findUsuariosSinRol();
        if (usuariosSinRol.isEmpty()) {
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(200).body(usuariosSinRol);
        }
    }
}
