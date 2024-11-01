package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.NovedadDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Novedad;
import co.edu.unbosque.NominaEmpleadosAPI.repository.INovedadRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NovedadService implements IService<NovedadDTO, Integer> {

    private final INovedadRepository repository;
    private final ModelMapper modelMapper;

    public NovedadService(INovedadRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void create(NovedadDTO dto) {
        var novedad = modelMapper.map(dto, Novedad.class);
        repository.save(novedad);
    }

    @Override
    public Optional<NovedadDTO> read(Integer id) {
        var novedad = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("La novedad no fue encontrada!"));
        var novedadDTO = modelMapper
                .map(novedad, NovedadDTO.class);
        return Optional.of(novedadDTO);
    }

    @Override
    public void update(Integer id, NovedadDTO dto) {
        dto.setId(id);
        var novedad = modelMapper.map(dto, Novedad.class);
        repository.save(novedad);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<NovedadDTO> readAll() {
        var novedades = (List<Novedad>) repository.findAll();
        return novedades
                .stream()
                .map(novedad -> modelMapper.map(novedad, NovedadDTO.class))
                .toList();
    }
}
