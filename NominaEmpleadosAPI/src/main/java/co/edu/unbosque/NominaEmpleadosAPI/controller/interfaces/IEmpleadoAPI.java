package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.CargoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/empleado/v1")
public interface IEmpleadoAPI {

    @PostMapping("/crear")
    ResponseEntity<?> create(@RequestBody EmpleadoDTO dto);

    @GetMapping("/buscar/{id}")
    ResponseEntity<?> read(@PathVariable Integer id);

    @PutMapping("/actualizar/{id}")
    ResponseEntity<?> update(@PathVariable Integer id, @RequestBody EmpleadoDTO dto );

    @DeleteMapping("/eliminar/{id}")
    ResponseEntity<?> delete(@PathVariable Integer id);

    @GetMapping("/listar")
    ResponseEntity<?> readAll();


}
