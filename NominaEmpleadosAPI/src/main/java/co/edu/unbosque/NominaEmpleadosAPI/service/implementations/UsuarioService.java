package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.UsuarioDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Usuario;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IRolUsuarioRepository;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IUsuarioRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements IService<UsuarioDTO, Integer> {

    private final IUsuarioRepository repository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final IRolUsuarioRepository repositoryRol;

    public UsuarioService(IUsuarioRepository repository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, IRolUsuarioRepository repositoryRol) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.repositoryRol = repositoryRol;
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
        var usuarioDTO = read(id).get();
        usuarioDTO.setDeleted(true);
        update(id, usuarioDTO);
    }

    @Override
    public List<UsuarioDTO> readAll() {
        var usuarios = repository.findAllNonDeleted();
        return usuarios
                .stream()
                .map((usuario) -> modelMapper.map(usuario, UsuarioDTO.class))
                .toList();
    }

    public List<UsuarioDTO> findUsuariosSinRol() {
        List<Integer> idsConRol = repositoryRol.findAll()
                .stream()
                .map(rolUsuario -> rolUsuario.getUsuario().getId())
                .collect(Collectors.toList());

        List<Usuario> usuariosSinRol = repository.findAll()
                .stream()
                .filter(usuario -> !idsConRol.contains(usuario.getId()))
                .collect(Collectors.toList());

        return usuariosSinRol.stream()
                .map(usuario -> modelMapper.map(usuario, UsuarioDTO.class))
                .collect(Collectors.toList());
    }
}
