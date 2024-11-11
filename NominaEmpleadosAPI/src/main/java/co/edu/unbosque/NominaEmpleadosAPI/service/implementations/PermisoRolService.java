package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.PermisoRolDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Permiso;
import co.edu.unbosque.NominaEmpleadosAPI.entity.PermisoRol;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Rol;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IPermisoRolRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermisoRolService implements IService<PermisoRolDTO, Integer> {

    private final IPermisoRolRepository repository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;


    public PermisoRolService(IPermisoRolRepository repository, ModelMapper modelMapper, EntityManager entityManager) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @Override
    public void create(PermisoRolDTO dto) {

        Permiso permiso = entityManager.getReference(Permiso.class, dto.getPermisoDTO().getId());
        Rol rol = entityManager.getReference(Rol.class, dto.getRolDTO().getId());

        var permisoRol = PermisoRol.builder()
                .permiso(permiso)
                .rol(rol)
                .build();
        repository.save(permisoRol);
    }

    @Override
    public Optional<PermisoRolDTO> read(Integer id) {

        var permisoRol = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El permiso de rol no existe!"));
        var permisoRolDTO = modelMapper
                .map(permisoRol, PermisoRolDTO.class);
        return Optional.of(permisoRolDTO);
    }

    @Override
    public void update(Integer id, PermisoRolDTO dto) {
        read(id);
        dto.setId(id);
        create(dto);
    }

    @Override
    public void delete(Integer id) {
        var permisoRolDTO = read(id).get();
        permisoRolDTO.setDeleted(true);
        update(id, permisoRolDTO);
    }

    @Override
    public List<PermisoRolDTO> readAll() {
        var permisosRol = repository.findAllNonDeleted();
        return permisosRol
                .stream()
                .map((permisoRol) -> modelMapper.map(permisoRol, PermisoRolDTO.class))
                .toList();
    }
}
