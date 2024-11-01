package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.INovedadAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.NovedadDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NovedadController implements INovedadAPI {

    private final IService<NovedadDTO, Integer> novedadService;

    public NovedadController(IService<NovedadDTO, Integer> novedadService) {
        this.novedadService = novedadService;
    }

    @Override
    public ResponseEntity<?> create(NovedadDTO dto) {
        novedadService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED.value()).body(dto);
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return ResponseEntity.status(HttpStatus.OK.value()).body(novedadService.read(id));
    }

    @Override
    public ResponseEntity<?> update(Integer id, NovedadDTO dto) {
        novedadService.update(id, dto);
        return ResponseEntity.status(HttpStatus.OK.value()).body(dto);
    }

    @Override
    public ResponseEntity<?> delete(Integer id) {
        novedadService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).build();
    }

    @Override
    public ResponseEntity<?> readAll() {
        return ResponseEntity.status(HttpStatus.OK.value()).body(novedadService.readAll());
    }
}
