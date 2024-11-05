package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.RolUsuarioDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Rol;
import co.edu.unbosque.NominaEmpleadosAPI.entity.RolUsuario;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Usuario;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IRolUsuarioRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolUsuarioService implements IService<RolUsuarioDTO, Integer> {

    private final IRolUsuarioRepository repository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;

    public RolUsuarioService(IRolUsuarioRepository repository, ModelMapper modelMapper, EntityManager entityManager) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @Override
    public void create(RolUsuarioDTO dto) {

        Usuario usuario = entityManager.getReference(Usuario.class, dto.getUsuarioDTO().getId());
        Rol rol = entityManager.getReference(Rol.class, dto.getRolDTO().getId());

        var rolUsuario = RolUsuario.builder()
                .usuario(usuario)
                .rol(rol)
                .build();
        repository.save(rolUsuario);
    }

    @Override
    public Optional<RolUsuarioDTO> read(Integer id) {
        var rolUsuario = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El Rol de usuario no existe!"));
        var rolUsuarioDTO = modelMapper
                .map(rolUsuario, RolUsuarioDTO.class);
        return Optional.of(rolUsuarioDTO);
    }

    @Override
    public void update(Integer id, RolUsuarioDTO dto) {
        read(id);
        dto.setId(id);
        create(dto);
    }

    @Override
    public void delete(Integer id) {
        read(id);
        repository.deleteById(id);
    }

    @Override
    public List<RolUsuarioDTO> readAll() {
        var rolesUsuario = (List<RolUsuario>) repository.findAll();
        return rolesUsuario
                .stream()
                .map((rolUsuario) -> modelMapper.map(rolUsuario, RolUsuarioDTO.class))
                .toList();
    }
}
