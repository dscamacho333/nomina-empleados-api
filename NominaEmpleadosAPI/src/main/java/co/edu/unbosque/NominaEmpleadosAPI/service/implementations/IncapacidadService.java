package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.IncapacidadDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Incapacidad;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Novedad;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IIncapacidadRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncapacidadService implements IService<IncapacidadDTO, Integer> {

    private final IIncapacidadRepository repository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;

    public IncapacidadService(IIncapacidadRepository repository, ModelMapper modelMapper, EntityManager entityManager) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @Override
    public void create(IncapacidadDTO dto) {
        try {
            Novedad novedad = entityManager.getReference(Novedad.class, dto.getId());
            var incapacidad = Incapacidad.builder()
                    .id(dto.getId())
                    .novedad(novedad)
                    .numeroDias(dto.getNumeroDias())
                    .fechaInicio(dto.getFechaInicio())
                    .fechaTerminacion(dto.getFechaTerminacion())
                    .build();

            repository.save(incapacidad);
        } catch (PersistenceException e) {
            throw new BadRequestException("Error al registrar la incapacidad.");
        }
    }

    @Override
    public Optional<IncapacidadDTO> read(Integer id) {
        var incapacidad = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Incapacidad no encontrada."));
        var incapacidadDTO = modelMapper.map(incapacidad, IncapacidadDTO.class);
        return Optional.of(incapacidadDTO);
    }

    @Override
    public void update(Integer id, IncapacidadDTO dto) {
        dto.setId(id);
        var incapacidad = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Incapacidad no encontrada para actualizar."));
        modelMapper.map(dto, incapacidad);
        repository.save(incapacidad);
    }

    @Override
    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Incapacidad no encontrada para eliminar.");
        }
        repository.deleteById(id);
    }

    @Override
    public List<IncapacidadDTO> readAll() {
        var incapacidades = repository.findAllNonDeleted();

        if (incapacidades.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron registros de incapacidades.");
        }

        return incapacidades.stream()
                .map((incapacidad) -> modelMapper.map(incapacidad, IncapacidadDTO.class))
                .toList();
    }
}
