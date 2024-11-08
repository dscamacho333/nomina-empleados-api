package co.edu.unbosque.NominaEmpleadosAPI.controller.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.controller.interfaces.IExcelAPI;
import co.edu.unbosque.NominaEmpleadosAPI.entity.ResponseExcel;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IExcelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ExcelController implements IExcelAPI {

    private final IExcelService excelService;

    public ExcelController(IExcelService excelService) {
        this.excelService = excelService;
    }

    @Override
    public ResponseEntity<ResponseExcel> cargarArchivoExcel(MultipartFile file) {
        try {
            excelService.cargarDatosDesdeExcel(file);
            ResponseExcel response = new ResponseExcel("Archivo cargado y datos insertados correctamente.", HttpStatus.OK);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ResponseExcel response = new ResponseExcel("Error al cargar el archivo: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
