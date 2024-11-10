package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.NovedadDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Empleado;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Novedad;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.INovedadRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NovedadService implements IService<NovedadDTO, Integer> {

    private final INovedadRepository repository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;

    public NovedadService(INovedadRepository repository, ModelMapper modelMapper, EntityManager entityManager) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @Override
    public void create(NovedadDTO dto) {
        try {
            Empleado empleado = entityManager.getReference(Empleado.class, dto.getEmpleadoDTO().getId());
            var novedad = Novedad.builder()
                    .id(dto.getId())
                    .empleado(empleado)
                    .numeroDias(dto.getNumeroDias())
                    .bonificacion(dto.getBonificacion())
                    .transporte(dto.getTransporte())
                    .build();

            repository.save(novedad);
        } catch (PersistenceException e) {
            throw new BadRequestException("Error al registrar la novedad.");
        }
    }

    @Override
    public Optional<NovedadDTO> read(Integer id) {
        var novedad = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("La novedad no fue encontrada."));
        var novedadDTO = modelMapper
                .map(novedad, NovedadDTO.class);
        return Optional.of(novedadDTO);
    }

    @Override
    public void update(Integer id, NovedadDTO dto) {
        dto.setId(id);
        var novedad = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Novedad no encontrada para actualizar."));
        modelMapper.map(dto, novedad);
        repository.save(novedad);
    }

    @Override
    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Novedad no encontrada para eliminar.");
        }
        var novedadDTO = read(id).get();
        novedadDTO.setDeleted(true);
        update(id, novedadDTO);
    }

    @Override
    public List<NovedadDTO> readAll() {
        var novedades = repository.findAllNonDeleted();

        if (novedades.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron registros de novedades.");
        }

        return novedades.stream()
                .map((novedad) -> modelMapper.map(novedad, NovedadDTO.class))
                .toList();
    }

}
