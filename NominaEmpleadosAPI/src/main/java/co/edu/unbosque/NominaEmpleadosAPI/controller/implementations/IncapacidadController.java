package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IIncapacidadAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.IncapacidadDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IncapacidadController implements IIncapacidadAPI {

    private final IService<IncapacidadDTO, Integer> incapacidadService;
    
    public IncapacidadController(IService<IncapacidadDTO, Integer> incapacidadService) {
        this.incapacidadService = incapacidadService;
    }

    @Override
    public ResponseEntity<?> create(IncapacidadDTO dto) {
        incapacidadService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED.value()).body(dto);
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return ResponseEntity.status(HttpStatus.OK.value()).body(incapacidadService.read(id));
    }

    @Override
    public ResponseEntity<?> update(Integer id, IncapacidadDTO dto) {
        incapacidadService.update(id, dto);
        return ResponseEntity.status(HttpStatus.OK.value()).body(dto);
    }

    @Override
    public ResponseEntity<?> delete(Integer id) {
        incapacidadService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).build();
    }

    @Override
    public ResponseEntity<?> readAll() {
        return ResponseEntity.status(HttpStatus.OK.value()).body(incapacidadService.readAll());
    }
}
