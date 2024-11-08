package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.repository.*;
import co.edu.unbosque.NominaEmpleadosAPI.entity.*;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IExcelService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ExcelService implements IExcelService {

    private final IDependenciaRepository dependenciaRepository;
    private final ICargoRepository cargoRepository;
    private final IEPSRepository epsRepository;
    private final IARLRepository arlRepository;
    private final IPensionRepository pensionRepository;
    private final IEmpleadoRepository empleadoRepository;
    private final INovedadRepository novedadRepository;
    private final IVacacionesRepository vacacionesRepository;
    private final IIncapacidadRepository incapacidadRepository;

    public ExcelService(IDependenciaRepository dependenciaRepository, ICargoRepository cargoRepository, IEPSRepository epsRepository, IARLRepository arlRepository, IPensionRepository pensionRepository, IEmpleadoRepository empleadoRepository, INovedadRepository novedadRepository, IVacacionesRepository vacacionesRepository, IIncapacidadRepository incapacidadRepository) {
        this.dependenciaRepository = dependenciaRepository;
        this.cargoRepository = cargoRepository;
        this.epsRepository = epsRepository;
        this.arlRepository = arlRepository;
        this.pensionRepository = pensionRepository;
        this.empleadoRepository = empleadoRepository;
        this.novedadRepository = novedadRepository;
        this.vacacionesRepository = vacacionesRepository;
        this.incapacidadRepository = incapacidadRepository;
    }

    private static Date getDateCellValue(Cell cell) throws Exception {
        if (cell.getCellType() == CellType.STRING) {
            String dateStr = cell.getStringCellValue();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            return dateFormat.parse(dateStr);
        } else if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getDateCellValue();
        } else {
            throw new IllegalArgumentException("El tipo de celda no es compatible para valores de fecha.");
        }
    }

    private static int getIntCellValue(Cell cell) {
        if (cell.getCellType() == CellType.NUMERIC) {
            return (int) cell.getNumericCellValue();
        } else if (cell.getCellType() == CellType.STRING) {
            return Integer.parseInt(cell.getStringCellValue());
        } else {
            throw new IllegalArgumentException("El tipo de celda no es compatible para valores enteros.");
        }
    }

    private static double getDoubleCellValue(Cell cell) {
        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        } else if (cell.getCellType() == CellType.STRING) {
            return Double.parseDouble(cell.getStringCellValue());
        } else {
            throw new IllegalArgumentException("El tipo de celda no es compatible para valores decimales.");
        }
    }

    private static boolean getBooleanCellValue(Cell cell) {
        if (cell.getCellType() == CellType.BOOLEAN) {
            return cell.getBooleanCellValue();
        } else if (cell.getCellType() == CellType.STRING) {
            return Boolean.parseBoolean(cell.getStringCellValue());
        } else {
            throw new IllegalArgumentException("El tipo de celda no es compatible para valores booleanos.");
        }
    }

    @Override
    public void cargarDatosDesdeExcel(MultipartFile file) throws Exception {
        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            // Hoja Dependencia
            Sheet dependenciaSheet = workbook.getSheet("Dependencia");
            for (Row row : dependenciaSheet) {
                if (row.getRowNum() == 0) continue;
                Dependencia dependencia = new Dependencia();
                dependencia.setId(getIntCellValue(row.getCell(0)));
                dependencia.setNombreDependencia(row.getCell(1).getStringCellValue());
                dependencia.setDeleted(getBooleanCellValue(row.getCell(2)));
                dependenciaRepository.save(dependencia);
            }

            // Hoja Cargo
            Sheet cargoSheet = workbook.getSheet("Cargo");
            for (Row row : cargoSheet) {
                if (row.getRowNum() == 0) continue;
                Cargo cargo = new Cargo();
                cargo.setId(getIntCellValue(row.getCell(0)));
                cargo.setNombreCargo(row.getCell(1).getStringCellValue());
                cargo.setDeleted(getBooleanCellValue(row.getCell(2)));
                cargoRepository.save(cargo);
            }

            // Hoja EPS
            Sheet epsSheet = workbook.getSheet("EPS");
            for (Row row : epsSheet) {
                if (row.getRowNum() == 0) continue;
                EPS eps = new EPS();
                eps.setId(getIntCellValue(row.getCell(0)));
                eps.setNombreEPS(row.getCell(1).getStringCellValue());
                eps.setDeleted(getBooleanCellValue(row.getCell(2)));
                epsRepository.save(eps);
            }

            // Hoja ARL
            Sheet arlSheet = workbook.getSheet("ARL");
            for (Row row : arlSheet) {
                if (row.getRowNum() == 0) continue;
                ARL arl = new ARL();
                arl.setId(getIntCellValue(row.getCell(0)));
                arl.setNombreARL(row.getCell(1).getStringCellValue());
                arl.setDeleted(getBooleanCellValue(row.getCell(2)));
                arlRepository.save(arl);
            }

            // Hoja Pension
            Sheet pensionSheet = workbook.getSheet("Pension");
            for (Row row : pensionSheet) {
                if (row.getRowNum() == 0) continue;
                Pension pension = new Pension();
                pension.setId(getIntCellValue(row.getCell(0)));
                pension.setNombrePension(row.getCell(1).getStringCellValue());
                pension.setDeleted(getBooleanCellValue(row.getCell(2)));
                pensionRepository.save(pension);
            }

            // Hoja Empleado
            Sheet empleadoSheet = workbook.getSheet("Empleado");
            for (Row row : empleadoSheet) {
                if (row.getRowNum() == 0) continue;
                Empleado empleado = new Empleado();

                empleado.setId(getIntCellValue(row.getCell(0)));
                empleado.setPrimerApellido(row.getCell(1).getStringCellValue());
                empleado.setSegundoApellido(row.getCell(2).getStringCellValue());
                empleado.setPrimerNombre(row.getCell(3).getStringCellValue());
                empleado.setSegundoNombre(row.getCell(4).getStringCellValue());
                empleado.setFechaIngreso(getDateCellValue(row.getCell(5)));

                // Dependencia
                Dependencia dependencia = new Dependencia();
                dependencia.setId(getIntCellValue(row.getCell(6)));
                empleado.setDependencia(dependencia);

                // Cargo
                Cargo cargo = new Cargo();
                cargo.setId(getIntCellValue(row.getCell(7)));
                empleado.setCargo(cargo);

                // EPS
                EPS eps = new EPS();
                eps.setId(getIntCellValue(row.getCell(8)));
                empleado.setEps(eps);

                // ARL
                ARL arl = new ARL();
                arl.setId(getIntCellValue(row.getCell(9)));
                empleado.setArl(arl);

                // Pension
                Pension pension = new Pension();
                pension.setId(getIntCellValue(row.getCell(10)));
                empleado.setPension(pension);

                empleado.setSueldo(getDoubleCellValue(row.getCell(11)));
                empleado.setDeleted(getBooleanCellValue(row.getCell(12)));

                empleadoRepository.save(empleado);
            }

            // Hoja Novedad
            Sheet novedadSheet = workbook.getSheet("Novedad");
            for (Row row : novedadSheet) {
                if (row.getRowNum() == 0) continue;
                Novedad novedad = new Novedad();

                novedad.setId(getIntCellValue(row.getCell(0)));

                // Empleado
                Empleado empleado = new Empleado();
                empleado.setId(getIntCellValue(row.getCell(1)));
                novedad.setEmpleado(empleado);

                novedad.setNumeroDias(getIntCellValue(row.getCell(2)));
                novedad.setBonificacion(getDoubleCellValue(row.getCell(3)));
                novedad.setTransporte(getDoubleCellValue(row.getCell(4)));
                novedad.setDeleted(getBooleanCellValue(row.getCell(5)));

                novedadRepository.save(novedad);
            }

            // Hoja Vacaciones
            Sheet vacacionesSheet = workbook.getSheet("Vacaciones");
            for (Row row : vacacionesSheet) {
                if (row.getRowNum() == 0) continue;
                Vacaciones vacaciones = new Vacaciones();

                vacaciones.setId(getIntCellValue(row.getCell(0)));

                // Novedad
                Novedad novedad = new Novedad();
                novedad.setId(getIntCellValue(row.getCell(1)));
                vacaciones.setNovedad(novedad);

                vacaciones.setNumeroDias(getIntCellValue(row.getCell(2)));
                vacaciones.setFechaInicio(getDateCellValue(row.getCell(3)));
                vacaciones.setFechaTerminacion(getDateCellValue(row.getCell(4)));
                vacaciones.setDeleted(getBooleanCellValue(row.getCell(5)));

                vacacionesRepository.save(vacaciones);
            }

            // Hoja Incapacidad
            Sheet incapacidadSheet = workbook.getSheet("Incapacidad");
            for (Row row : incapacidadSheet) {
                if (row.getRowNum() == 0) continue;
                Incapacidad incapacidad = new Incapacidad();

                incapacidad.setId(getIntCellValue(row.getCell(0)));

                // Novedad
                Novedad novedad = new Novedad();
                novedad.setId(getIntCellValue(row.getCell(1)));
                incapacidad.setNovedad(novedad);

                incapacidad.setNumeroDias(getIntCellValue(row.getCell(2)));
                incapacidad.setFechaInicio(getDateCellValue(row.getCell(3)));
                incapacidad.setFechaTerminacion(getDateCellValue(row.getCell(4)));
                incapacidad.setDeleted(getBooleanCellValue(row.getCell(5)));

                incapacidadRepository.save(incapacidad);
            }
        }
    }
}
