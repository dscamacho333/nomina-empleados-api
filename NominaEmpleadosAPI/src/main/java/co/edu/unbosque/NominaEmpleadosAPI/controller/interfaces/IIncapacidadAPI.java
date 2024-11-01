package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.IncapacidadDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/incapacidad/v1")
public interface IIncapacidadAPI {

    @PostMapping("/crear")
    ResponseEntity<?> create(@RequestBody IncapacidadDTO dto);

    @GetMapping("/buscar/{id}")
    ResponseEntity<?> read(@PathVariable Integer id);

    @PutMapping("/actualizar/{id}")
    ResponseEntity<?> update(@PathVariable Integer id, @RequestBody IncapacidadDTO dto );

    @DeleteMapping("/eliminar/{id}")
    ResponseEntity<?> delete(@PathVariable Integer id);

    @GetMapping("/listar")
    ResponseEntity<?> readAll();
}
