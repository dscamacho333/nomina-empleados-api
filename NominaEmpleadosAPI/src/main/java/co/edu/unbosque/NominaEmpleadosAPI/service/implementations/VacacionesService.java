package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.VacacionesDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Novedad;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Vacaciones;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IVacacionesRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VacacionesService implements IService<VacacionesDTO, Integer> {

    private final IVacacionesRepository repository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;

    public VacacionesService(IVacacionesRepository repository, ModelMapper modelMapper, EntityManager entityManager) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @Override
    public void create(VacacionesDTO dto) {
        try {
            Novedad novedad = entityManager.getReference(Novedad.class, dto.getId());
            var vacacion = Vacaciones.builder()
                    .id(dto.getId())
                    .novedad(novedad)
                    .numeroDias(dto.getNumeroDias())
                    .fechaInicio(dto.getFechaInicio())
                    .fechaTerminacion(dto.getFechaTerminacion())
                    .build();
            repository.save(vacacion);
        } catch (PersistenceException e) {
            throw new BadRequestException("Error al registrar las vacaciones.");
        }
    }

    @Override
    public Optional<VacacionesDTO> read(Integer id) {
        var vacacion = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vacaciones no encontradas."));
        var vacacionesDTO = modelMapper.map(vacacion, VacacionesDTO.class);
        return Optional.of(vacacionesDTO);
    }

    @Override
    public void update(Integer id, VacacionesDTO dto) {
        dto.setId(id);
        var vacacion = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vacaciones no encontradas para actualizar."));
        modelMapper.map(dto, vacacion);
        repository.save(vacacion);
    }

    @Override
    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Vacaciones no encontradas para eliminar.");
        }
        repository.deleteById(id);
    }

    @Override
    public List<VacacionesDTO> readAll() {
        var vacaciones = (List<Vacaciones>) repository.findAll();

        if (vacaciones.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron registros de vacaciones.");
        }

        return vacaciones.stream()
                .map((vacacion) -> modelMapper.map(vacacion, VacacionesDTO.class))
                .toList();
    }
}
