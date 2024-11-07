package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.PermisoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Permiso;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IPermisoRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermisoService implements IService<PermisoDTO, Integer> {

    private final IPermisoRepository repository;
    private final ModelMapper modelMapper;


    public PermisoService(IPermisoRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void create(PermisoDTO dto) {
        var permiso = modelMapper
                .map(dto, Permiso.class);
        repository.save(permiso);
    }

    @Override
    public Optional<PermisoDTO> read(Integer id) {
        var permiso = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El permiso no existe!"));
        var permisoDTO = modelMapper
                .map(permiso, PermisoDTO.class);
        return Optional.of(permisoDTO);
    }

    @Override
    public void update(Integer id, PermisoDTO dto) {
        read(id);
        dto.setId(id);
        var permiso = modelMapper
                .map(dto, Permiso.class);
        repository.save(permiso);
    }

    @Override
    public void delete(Integer id) {
        read(id);
        repository.deleteById(id);
    }

    @Override
    public List<PermisoDTO> readAll() {
        var permisos = repository.findAllNonDeleted();
        return permisos
                .stream()
                .map((permiso) -> modelMapper.map(permiso, PermisoDTO.class))
                .toList();
    }
}
