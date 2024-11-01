package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.CargoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.dto.DependenciaDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/cargo/v1")
public interface ICargoAPI {

    @PostMapping("/crear")
    ResponseEntity<?> create(@RequestBody CargoDTO dto);

    @GetMapping("/buscar/{id}")
    ResponseEntity<?> read(@PathVariable Integer id);

    @PutMapping("/actualizar/{id}")
    ResponseEntity<?> update(@PathVariable Integer id, @RequestBody CargoDTO dto );

    @DeleteMapping("/eliminar/{id}")
    ResponseEntity<?> delete(@PathVariable Integer id);

    @GetMapping("/listar")
    ResponseEntity<?> readAll();


}
