package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.UsuarioDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Usuario;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IUsuarioRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements IService<UsuarioDTO, Integer> {

    private final IUsuarioRepository repository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(IUsuarioRepository repository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void create(UsuarioDTO dto) {
        var usuario = Usuario.builder()
                .usuario(dto.getUsuario())
                .contrasenia(passwordEncoder.encode(dto.getContrasenia()))
                .estaHabilitado(true)
                .cuentaNoExpirada(true)
                .cuentaNoBloqueada(true)
                .credencialesNoExpiradas(true)
                .build();
        repository.save(usuario);
    }

    @Override
    public Optional<UsuarioDTO> read(Integer id) {
        var usuario = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El usuario no existe!"));
        var usuarioDTO = modelMapper
                .map(usuario, UsuarioDTO.class);
        return Optional.of(usuarioDTO);
    }

    @Override
    public void update(Integer id, UsuarioDTO dto) {
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
    public List<UsuarioDTO> readAll() {
        var usuarios = repository.findAllNonDeleted();
        return usuarios
                .stream()
                .map((usuario) -> modelMapper.map(usuario, UsuarioDTO.class))
                .toList();
    }
}
