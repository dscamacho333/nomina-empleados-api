package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EPSDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/eps/v1")
public interface IEPSAPI {

    @PostMapping("/crear")
    ResponseEntity<?> create(@RequestBody EPSDTO dto);

    @GetMapping("/buscar/{id}")
    ResponseEntity<?> read(@PathVariable Integer id);

    @PutMapping("/actualizar/{id}")
    ResponseEntity<?> update(@PathVariable Integer id, @RequestBody EPSDTO dto);

    @DeleteMapping("/eliminar/{id}")
    ResponseEntity<?> delete(@PathVariable Integer id);

    @GetMapping("/listar")
    ResponseEntity<?> readAll();

}