package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IDependenciaAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.DependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.implementations.DependenciaService;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DependenciaController implements IDependenciaAPI {

    private final IService<DependenciaDTO, Integer>  service;

    public DependenciaController(IService<DependenciaDTO, Integer> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<?> create(DependenciaDTO dto) {
        service.create(dto);
        return ResponseEntity.status(201).body(dto);
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return ResponseEntity.status(200).body(service.read(id));
    }

    @Override
    public ResponseEntity<?> update(Integer id, DependenciaDTO dto) {
        service.update(id, dto);
        return ResponseEntity.status(200).body(dto);
    }

    @Override
    public ResponseEntity<?> delete(Integer id) {
        service.delete(id);
        return ResponseEntity.status(204).build();
    }

    @Override
    public ResponseEntity<?> readAll() {
        return ResponseEntity.status(200).body(service.readAll());
    }
}
