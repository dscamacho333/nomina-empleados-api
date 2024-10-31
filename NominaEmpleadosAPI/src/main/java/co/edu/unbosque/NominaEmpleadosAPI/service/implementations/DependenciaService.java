package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.DependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Dependencia;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IDependenciaRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DependenciaService implements IService<DependenciaDTO, Integer> {

    private final IDependenciaRepository repository;
    private final ModelMapper modelMapper;

    public DependenciaService(IDependenciaRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void create(DependenciaDTO dto) {
        var dependencia = modelMapper.map(dto, Dependencia.class);
        repository.save(dependencia);
    }

    @Override
    public Optional<DependenciaDTO> read(Integer id) {
        var dependenciaDTO = repository.findById(id).get();
        return Optional.of(modelMapper.map(dependenciaDTO, DependenciaDTO.class));
    }

    @Override
    public void update(Integer id, DependenciaDTO dto) {
        dto.setId(id);
        var dependencia = modelMapper.map(dto, Dependencia.class);
        repository.save(dependencia);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<DependenciaDTO> readAll() {
        var dependencias = (List<Dependencia>) repository
                .findAll();
        return dependencias
                .stream()
                .map((dependencia) -> modelMapper.map(dependencia, DependenciaDTO.class))
                .toList();
    }
}
