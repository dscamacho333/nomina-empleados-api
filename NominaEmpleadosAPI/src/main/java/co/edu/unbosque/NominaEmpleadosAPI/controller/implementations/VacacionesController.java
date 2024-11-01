package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IVacacionesAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.VacacionesDTO;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VacacionesController implements IVacacionesAPI {

    private final IService<VacacionesDTO, Integer> vacacionesService;

    public VacacionesController(IService<VacacionesDTO, Integer> vacacionesService) {
        this.vacacionesService = vacacionesService;
    }

    @Override
    public ResponseEntity<?> create(VacacionesDTO dto) {
        vacacionesService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED.value()).body(dto);
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return ResponseEntity.status(HttpStatus.OK.value()).body(vacacionesService.read(id));
    }

    @Override
    public ResponseEntity<?> update(Integer id, VacacionesDTO dto) {
        vacacionesService.update(id, dto);
        return ResponseEntity.status(HttpStatus.OK.value()).body(dto);
    }

    @Override
    public ResponseEntity<?> delete(Integer id) {
        vacacionesService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT.value()).build();
    }

    @Override
    public ResponseEntity<?> readAll() {
        return ResponseEntity.status(HttpStatus.OK.value()).body(vacacionesService.readAll());
    }
}
