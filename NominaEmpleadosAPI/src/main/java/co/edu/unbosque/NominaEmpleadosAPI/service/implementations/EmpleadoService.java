package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.*;
import co.edu.unbosque.NominaEmpleadosAPI.entity.*;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEmpleadoRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService implements IService<EmpleadoDTO, Integer> {

    private final IEmpleadoRepository repository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;


    public EmpleadoService(IEmpleadoRepository repository, ModelMapper modelMapper, EntityManager entityManager) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }


    @Override
    public void create(EmpleadoDTO dto) {

        try{
            Dependencia dependencia = entityManager.getReference(Dependencia.class, dto.getDependenciaDTO().getId());
            Cargo cargo = entityManager.getReference(Cargo.class, dto.getCargoDTO().getId());
            EPS eps = entityManager.getReference(EPS.class, dto.getEpsDTO().getId());
            ARL arl = entityManager.getReference(ARL.class, dto.getArlDTO().getId());
            Pension pension = entityManager.getReference(Pension.class, dto.getPensionDTO().getId());

            var empleado = Empleado.builder()
                    .id(dto.getId())
                    .primerApellido(dto.getPrimerApellido())
                    .segundoApellido(dto.getSegundoApellido())
                    .primerNombre(dto.getPrimerNombre())
                    .segundoNombre(dto.getSegundoNombre())
                    .fechaIngreso(dto.getFechaIngreso())
                    .dependencia(dependencia)
                    .cargo(cargo)
                    .eps(eps)
                    .arl(arl)
                    .pension(pension)
                    .sueldo(dto.getSueldo())
                    .build();

            repository.save(empleado);
        }catch (PersistenceException exception){
            throw new BadRequestException("Error al crear el empleado!");
        }
    }

    @Override
    public Optional<EmpleadoDTO> read(Integer id) {
        var empleado = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no existe!"));
        var empleadoDTO = modelMapper
                .map(empleado, EmpleadoDTO.class);
        return Optional.of(empleadoDTO);
    }

    @Override
    public void update(Integer id, EmpleadoDTO dto) {
        read(id);
        dto.setId(id);
        var empleado = modelMapper
                .map(dto, Empleado.class);
        repository.save(empleado);
    }

    @Override
    public void delete(Integer id) {
        read(id);
        repository
                .deleteById(id);
    }

    @Override
    public List<EmpleadoDTO> readAll() {
        var empleados = repository.findAllNonDeleted();
        return empleados
                .stream()
                .map((empleado) -> modelMapper.map(empleado, EmpleadoDTO.class))
                .toList();
    }
}
