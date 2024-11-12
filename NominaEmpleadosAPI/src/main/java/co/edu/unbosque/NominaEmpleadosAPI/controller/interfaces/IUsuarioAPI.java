package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.UsuarioDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/usuario/v1")

public interface IUsuarioAPI {

    @PostMapping("/crear")
    ResponseEntity<?> create(@RequestBody UsuarioDTO dto);

    @PreAuthorize("hasAnyRole('ADMIN','DESARROLLADOR')")
    @GetMapping("/buscar/{id}")
    ResponseEntity<?> read(@PathVariable Integer id);

    @PreAuthorize("hasAnyRole('ADMIN','DESARROLLADOR')")
    @PutMapping("/actualizar/{id}")
    ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UsuarioDTO dto);

    @PreAuthorize("hasAnyRole('ADMIN','DESARROLLADOR')")
    @DeleteMapping("/eliminar/{id}")
    ResponseEntity<?> delete(@PathVariable Integer id);

    @PreAuthorize("hasAnyRole('ADMIN','DESARROLLADOR')")
    @GetMapping("/listar")
    ResponseEntity<?> readAll();

    @PreAuthorize("hasAnyRole('ADMIN','DESARROLLADOR')")
    @GetMapping("/listar-sin-rol")
    ResponseEntity<List<UsuarioDTO>> listarUsuariosSinRol();
}