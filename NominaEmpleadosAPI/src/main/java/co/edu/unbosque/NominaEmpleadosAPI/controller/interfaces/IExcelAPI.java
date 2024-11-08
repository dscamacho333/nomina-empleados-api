package co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.entity.ResponseExcel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;

@RequestMapping("/api/nomina-empleados/v1")
public interface IExcelAPI {

    @PostMapping("/cargar-excel")
    ResponseEntity<ResponseExcel> cargarArchivoExcel(@RequestParam("file") MultipartFile file);
}
