package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IDependenciaAPI;
import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IEPSAPI;
import co.edu.unbosque.NominaEmpleadosAPI.dto.DependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.dto.EPSDTO;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEPSRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.springframework.http.ResponseEntity;

public class EPSController implements IEPSAPI {

    private final IService<EPSDTO, Integer> service;

    public EPSController(IService<EPSDTO, Integer> service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<?> create(EPSDTO dto) {
        service.create(dto);
        return ResponseEntity.status(201).body(dto);
    }

    @Override
    public ResponseEntity<?> read(Integer id) {
        return ResponseEntity.status(200).body(service.read(id));
    }

    @Override
    public ResponseEntity<?> update(Integer id, EPSDTO dto) {
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
