package co.edu.unbosque.NominaEmpleadosAPI.queries.service;


import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.*;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.*;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEmpleadoRepository;
import co.edu.unbosque.NominaEmpleadosAPI.repository.INovedadRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ConsultasService implements IConsultas {

    private final IEmpleadoRepository empleadoRepository;
    private final INovedadRepository novedadRepository;
    private final ModelMapper modelMapper;
    private final Map<String, List<String>> dependenciaCargosMap;

    public ConsultasService(IEmpleadoRepository empleadoRepository, INovedadRepository novedadRepository, ModelMapper modelMapper) {
        this.empleadoRepository = empleadoRepository;
        this.novedadRepository = novedadRepository;
        this.modelMapper = modelMapper;
        this.dependenciaCargosMap = new HashMap<>();
        dependenciaCargosMap.put("Comercial", Arrays.asList("Gerente de ventas", "Director de ventas", "Asesor Comercial"));
        dependenciaCargosMap.put("Contabilidad", Arrays.asList("Director de Impuestos", "Auditor interno", "Director de presupuestos", "Director de costos"));
        dependenciaCargosMap.put("Facturacion", Arrays.asList("Auxiliar especializado", "Director de Facturacion", "Director de cartera"));
        dependenciaCargosMap.put("Tecnologia", Arrays.asList("Ingeniero de Desarrollo", "Ingeniero de Soporte", "DBA", "Lider de infraestructura", "Lider de QA", "Analista QA", "Gerente TI", "Arquitecto de Software"));

    }

    @Override
    public ReporteNombreDependencia listarEmpleadosOrdenados(String criterioOrden) {
        List<EmpleadoDTO> empleadosDTO = empleadoRepository.ordenarPor(criterioOrden).stream()
                .map((empleado) -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        return new ReporteNombreDependencia(empleadosDTO, empleadoRepository.count());
    }

    @Override
    public ReporteCargoDependencia listarEmpleadosPorCargoYDependencia(String ordenNombre) {
        List<EmpleadoDTO> empleadosDTO = empleadoRepository.listarPorCargoYDependencia(ordenNombre).stream()
                .map(empleado -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        List<CargoDependenciaDTO> cantidadPorCargoYDependencia = new ArrayList<>();
        List<CantidadDependenciaDTO> cantidadPorDependencia = new ArrayList<>();

        empleadoRepository.contarEmpleadosPorCargoYDependencia().forEach(resultado -> {
            String cargo = (String) resultado[0];
            String dependencia = (String) resultado[1];
            Long cantidad = (Long) resultado[2];

            cantidadPorCargoYDependencia.add(new CargoDependenciaDTO(cargo, dependencia, cantidad));
        });

        empleadoRepository.contarEmpleadosPorDependencia().forEach(resultado -> {
            String dependencia = (String) resultado[0];
            Long cantidad = (Long) resultado[1];

            cantidadPorDependencia.add(new CantidadDependenciaDTO(dependencia, cantidad));
        });

        return new ReporteCargoDependencia(empleadosDTO, cantidadPorCargoYDependencia, cantidadPorDependencia, empleadoRepository.count());
    }

    @Override
    public ReporteCargoSaludPension listarEmpleadosPensionCargoNombre(String ordenNombre) {
        List<EmpleadoDTO> empleadosDTO = empleadoRepository.listarPorCargoEpsPension(ordenNombre).stream()
                .map(empleado -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        return new ReporteCargoSaludPension(empleadosDTO);
    }

    @Override
    public ReporteInformacionIndividual obtenerInformacionIndividual(Integer idEmpleado) {
        List<Object[]> resultados = empleadoRepository.obtenerInformacionIndividual(idEmpleado);

        Object[] resultado = resultados.get(0);

        return new ReporteInformacionIndividual(
                (String) resultado[0],
                (String) resultado[1],
                (Double) resultado[2],
                (String) resultado[3],
                (String) resultado[4],
                (String) resultado[5],
                (String) resultado[6],
                (Integer) resultado[7],
                (Double) resultado[8],
                (Double) resultado[9],
                (Date) resultado[10],
                (Date) resultado[11],
                (Date) resultado[12],
                (Date) resultado[13]
        );
    }

    @Override
    public List<ReporteFechaNovedad> obtenerNovedadesPorFechas(Date fechaInicio, Date fechaFin) {
        List<Object[]> resultados = novedadRepository.findNovedadesPorFechas(fechaInicio, fechaFin);

        return resultados.stream()
                .map(obj -> new ReporteFechaNovedad(
                        (String) obj[0],
                        (String) obj[1],
                        (Integer) obj[2],
                        (Date) obj[3],
                        (Date) obj[4],
                        (Date) obj[5],
                        (Date) obj[6]
                ))
                .toList();
    }

    @Override
    public List<ReporteDetalleNovedad> obtenerNovedadesPorRangoFechaCargoDependencia(Date fechaInicio, Date fechaFin, String dependencia, String cargo) {
        List<Object[]> resultados = novedadRepository.detalleNovedadesPorRangoFechaCargoDependencia(fechaInicio, fechaFin, dependencia, cargo);

        return resultados.stream()
                .map(obj -> new ReporteDetalleNovedad(
                        (String) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        obj[4] != null ? ((Number) obj[4]).longValue() : 0L,
                        obj[5] != null ? (Date) obj[5] : null,
                        obj[6] != null ? (Date) obj[6] : null,
                        obj[7] != null ? ((Number) obj[7]).longValue() : 0L,
                        obj[8] != null ? (Date) obj[8] : null,
                        obj[9] != null ? (Date) obj[9] : null,
                        obj[10] != null ? ((Number) obj[10]).doubleValue() : 0.0,
                        obj[11] != null ? ((Number) obj[11]).doubleValue() : 0.0,
                        obj[12] != null ? ((Number) obj[12]).doubleValue() : 0.0
                ))
                .toList();
    }

    @Override
    public List<ReporteGraficoDependencia> obtenerEmpleadosPorDependencia() {
        List<Object[]> resultados = empleadoRepository.contarEmpleadosPorDependencia();
        List<CantidadDependenciaDTO> cantidadDependenciaDTOList = new ArrayList<>();

        resultados.forEach(resultado -> {
            String dependencia = (String) resultado[0];
            Long cantidadEmpleados = (Long) resultado[1];
            cantidadDependenciaDTOList.add(new CantidadDependenciaDTO(dependencia, cantidadEmpleados));
        });


        return List.of(new ReporteGraficoDependencia(cantidadDependenciaDTOList));

    }

    @Override
    public List<ReporteGraficoCargo> obtenerEmpleadosPorCargo() {
        List<Object[]> resultados = empleadoRepository.contarEmpleadosPorCargo();
        List<CantidadCargoDTO> cantidadPorCargo = new ArrayList<>();

        resultados.forEach(resultado -> {
            String cargo = (String) resultado[0];
            Long cantidad = (Long) resultado[1];
            cantidadPorCargo.add(new CantidadCargoDTO(cargo, cantidad));
        });

        return List.of(new ReporteGraficoCargo(cantidadPorCargo));
    }

    @Override
    public List<ReporteGraficoEPS> obtenerEmpleadosPorEPS() {
        List<Object[]> resultados = empleadoRepository.contarEmpleadosPorEPS();
        List<CantidadEPSDTO> cantidadPorEPS = new ArrayList<>();

        resultados.forEach(resultado -> {
            String eps = (String) resultado[0];
            Long cantidad = (Long) resultado[1];
            cantidadPorEPS.add(new CantidadEPSDTO(eps, cantidad));
        });

        return List.of(new ReporteGraficoEPS(cantidadPorEPS));
    }

    @Override
    public List<ReporteGraficoPension> obtenerEmpleadosPorPension() {
        List<Object[]> resultados = empleadoRepository.contarEmpleadosPorPension();
        List<CantidadPensionDTO> cantidadPorPension = new ArrayList<>();

        resultados.forEach(resultado -> {
            String pension = (String) resultado[0];
            Long cantidad = (Long) resultado[1];
            cantidadPorPension.add(new CantidadPensionDTO(pension, cantidad));
        });

        return List.of(new ReporteGraficoPension(cantidadPorPension));
    }

    @Override
    public List<ReporteGraficoEPSDependencia> obtenerEmpleadosPorEPSyDependencia() {

        List<Object[]> resultados = empleadoRepository.contarEmpleadosPorEPSyDependencia();
        List<EmpleadosPorEPSyDependenciaDTO> empleadosPorEPSyDependenciaList = new ArrayList<>();


        for (Object[] resultado : resultados) {
            String eps = (String) resultado[0]; // EPS
            String dependencia = (String) resultado[1]; // Dependencia
            Long cantidad = (Long) resultado[2]; // Cantidad de empleados


            empleadosPorEPSyDependenciaList.add(new EmpleadosPorEPSyDependenciaDTO(eps, dependencia, cantidad));
        }

        ReporteGraficoEPSDependencia reporte = new ReporteGraficoEPSDependencia(empleadosPorEPSyDependenciaList);


        return List.of(reporte);
    }

    @Override
    public List<ReporteGraficoPensionDependencia> obtenerEmpleadosPorPensionYDependencia() {
        List<Object[]> resultados = empleadoRepository.contarEmpleadosPorPensionYDependencia();

        List<EmpleadorPorPensionYDependenciaDTO> empleadorPorPensionYDependenciaList = new ArrayList<>();

        resultados.forEach(resultado -> {
            String pension = (String) resultado[0];
            String dependencia = (String) resultado[1];
            Long cantidad = (Long) resultado[2];

            empleadorPorPensionYDependenciaList.add(new EmpleadorPorPensionYDependenciaDTO(pension, dependencia, cantidad));
        });

        ReporteGraficoPensionDependencia reporte = new ReporteGraficoPensionDependencia(empleadorPorPensionYDependenciaList);

        return List.of(reporte);
    }

    @Override
    public List<String> obtenerCargosPorDependencia(String nombreDependencia) {
        return dependenciaCargosMap.getOrDefault(nombreDependencia, List.of());
    }
}






