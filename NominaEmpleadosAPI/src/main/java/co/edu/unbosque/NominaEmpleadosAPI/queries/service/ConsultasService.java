package co.edu.unbosque.NominaEmpleadosAPI.queries.service;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EmpleadoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.CargoDependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina1;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.ReporteNomina2;
import co.edu.unbosque.NominaEmpleadosAPI.queries.response.dto.DependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEmpleadoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConsultasService implements IConsultas {

    @Autowired
    private IEmpleadoRepository repository;
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
        List<DependenciaDTO> cantidadPorDependencia = new ArrayList<>();

        repository.contarEmpleadosPorCargoYDependencia().forEach(resultado -> {
            String cargo = (String) resultado[0];
            String dependencia = (String) resultado[1];
            Long cantidad = (Long) resultado[2];

            cantidadPorCargoYDependencia.add(new CargoDependenciaDTO(cargo, dependencia, cantidad));
        });

        repository.contarEmpleadosPorDependencia().forEach(resultado -> {
            String dependencia = (String) resultado[0];
            Long cantidad = (Long) resultado[1];

            cantidadPorDependencia.add(new DependenciaDTO(dependencia, cantidad));
        });

        return new ReporteNomina2(empleadosDTO, cantidadPorCargoYDependencia, cantidadPorDependencia, repository.count());
    }
}
