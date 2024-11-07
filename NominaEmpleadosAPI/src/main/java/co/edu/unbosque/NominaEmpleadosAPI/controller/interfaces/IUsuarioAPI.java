package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.UsuarioDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/usuario/v1")
@PreAuthorize("hasAnyRole('ADMIN','DESARROLLADOR')")
public interface IUsuarioAPI {

    @PostMapping("/crear")
    ResponseEntity<?> create(@RequestBody UsuarioDTO dto);

    @GetMapping("/buscar/{id}")
    ResponseEntity<?> read(@PathVariable Integer id);

    @PutMapping("/actualizar/{id}")
    ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UsuarioDTO dto);

    @DeleteMapping("/eliminar/{id}")
    ResponseEntity<?> delete(@PathVariable Integer id);

    @GetMapping("/listar")
    ResponseEntity<?> readAll();

}
