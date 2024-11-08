package co.edu.unbosque.NominaEmpleadosAPI.service.interfaces;

import org.springframework.web.multipart.MultipartFile;

public interface IExcelService {
    void cargarDatosDesdeExcel(MultipartFile file) throws Exception;
}
