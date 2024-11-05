package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.RolDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Rol;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IRolRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService implements IService<RolDTO, Integer> {

    private final IRolRepository repository;
    private final ModelMapper modelMapper;


    public RolService(IRolRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void create(RolDTO dto) {
        var rol = modelMapper
                .map(dto, Rol.class);
        repository.save(rol);
    }

    @Override
    public Optional<RolDTO> read(Integer id) {
        var rol = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El Rol no existe!"));
        var rolDTO = modelMapper
                .map(rol, RolDTO.class);
        return Optional.of(rolDTO);
    }

    @Override
    public void update(Integer id, RolDTO dto) {
        read(id);
        dto.setId(id);
        var rol = modelMapper
                .map(dto, Rol.class);
        repository.save(rol);
    }

    @Override
    public void delete(Integer id) {
        read(id);
        repository.deleteById(id);
    }

    @Override
    public List<RolDTO> readAll() {
        var roles = (List<Rol>) repository.findAll();
        return roles
                .stream()
                .map((rol) -> modelMapper.map(rol, RolDTO.class))
                .toList();
    }
}
