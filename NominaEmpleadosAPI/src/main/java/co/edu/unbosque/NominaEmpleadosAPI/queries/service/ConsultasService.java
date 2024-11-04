package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteCargoSaludPension;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNovedad;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CargoDependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina1;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina2;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEmpleadoRepository;
import co.edu.unbosque.NominaEmpleadosAPI.repository.INovedadRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ConsultasService implements IConsultas {

    @Autowired
    private IEmpleadoRepository repository;
    @Autowired
    private INovedadRepository novedadRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReporteNomina1 listarEmpleadosOrdenados(String criterioOrden) {
        List<EmpleadoDTO> empleadosDTO = repository.ordenarPor(criterioOrden).stream()
                .map((empleado) -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        return new ReporteNomina1(empleadosDTO, repository.count());
    }

    @Override
    public ReporteNomina2 listarEmpleadosPorCargoYDependencia(String ordenNombre) {
        List<EmpleadoDTO> empleadosDTO = repository.listarPorCargoYDependencia(ordenNombre).stream()
                .map(empleado -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        List<CargoDependenciaDTO> cantidadPorCargoYDependencia = new ArrayList<>();

        repository.contarEmpleadosPorCargoYDependencia().forEach(resultado -> {
            String cargo = (String) resultado[0];
            String dependencia = (String) resultado[1];
            Long cantidad = (Long) resultado[2];

            cantidadPorCargoYDependencia.add(new CargoDependenciaDTO(cargo, dependencia, cantidad));
        });

        return new ReporteNomina2(empleadosDTO, cantidadPorCargoYDependencia, repository.count());
    }

    @Override
    public ReporteCargoSaludPension listarEmpleadosPensionCargoNombre(String ordenNombre) {
        List<EmpleadoDTO> empleadosDTO = repository.listarPorCargoEpsPension(ordenNombre).stream()
                .map(empleado -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();

        return new ReporteCargoSaludPension(empleadosDTO);
    }

    @Override
    public List<ReporteNovedad> obtenerNovedadesPorFechas(Date fechaInicio, Date fechaFin) {
        List<Object[]> resultados = novedadRepository.findNovedadesEntreFechas(fechaInicio, fechaFin);

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


}
