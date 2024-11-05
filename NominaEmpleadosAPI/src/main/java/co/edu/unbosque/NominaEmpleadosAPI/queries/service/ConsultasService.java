package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.*;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CargoDependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CantidadDependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEmpleadoRepository;
import co.edu.unbosque.NominaEmpleadosAPI.repository.INovedadRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ConsultasService implements IConsultas {

    private final IEmpleadoRepository empleadoRepository;
    private final INovedadRepository novedadRepository;
    private final ModelMapper modelMapper;

    public ConsultasService(IEmpleadoRepository empleadoRepository, INovedadRepository novedadRepository, ModelMapper modelMapper) {
        this.empleadoRepository = empleadoRepository;
        this.novedadRepository = novedadRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ReporteNomina1 listarEmpleadosOrdenados(String criterioOrden) {
        List<EmpleadoDTO> empleadosDTO = empleadoRepository.ordenarPor(criterioOrden).stream()
                .map((empleado) -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        return new ReporteNomina1(empleadosDTO, empleadoRepository.count());
    }

    @Override
    public ReporteNomina2 listarEmpleadosPorCargoYDependencia(String ordenNombre) {
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

        return new ReporteNomina2(empleadosDTO, cantidadPorCargoYDependencia, cantidadPorDependencia, empleadoRepository.count());
    }

    @Override
    public ReporteCargoSaludPension listarEmpleadosPensionCargoNombre(String ordenNombre) {
        List<EmpleadoDTO> empleadosDTO = empleadoRepository.listarPorCargoEpsPension(ordenNombre).stream()
                .map(empleado -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        return new ReporteCargoSaludPension(empleadosDTO);
    }

    @Override
    public List<ReporteNovedad> obtenerNovedadesPorFechas(Date fechaInicio, Date fechaFin) {
        List<Object[]> resultados = novedadRepository.findNovedadesPorFechas(fechaInicio, fechaFin);

        return resultados.stream()
                .map(obj -> new ReporteNovedad(
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
                        (Long) obj[4],
                        (Date) obj[5],
                        (Date) obj[6],
                        (Long) obj[7],
                        (Date) obj[8],
                        (Date) obj[9],
                        (Double) obj[10],
                        (Double) obj[11],
                        (Double) obj[12]
                ))
                .toList();
    }

}
