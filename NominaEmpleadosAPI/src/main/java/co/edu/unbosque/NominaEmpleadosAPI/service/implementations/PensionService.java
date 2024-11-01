package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.PensionDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Pension;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IPensionRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PensionService implements IService<PensionDTO, Integer> {

    private final ModelMapper modelMapper;
    private final IPensionRepository pensionRepository;

    public PensionService(ModelMapper modelMapper, IPensionRepository pensionRepository) {
        this.modelMapper = modelMapper;
        this.pensionRepository = pensionRepository;
    }

    @Override
    public void create(PensionDTO pensionDTO) {
        try {
            Pension pension = pensionRepository.save(modelMapper.map(pensionDTO, Pension.class));
        } catch (PersistenceException e) {
            throw new BadRequestException("No se pudo guardar los datos de la pension, por favor verifique los datos.");
        }
    }

    @Override
    public Optional<PensionDTO> read(Integer id) {
        return Optional.of(pensionRepository.findById(id)
                .map(pension -> modelMapper.map(pension, PensionDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("Pensión no encontrada.")));
    }

    @Override
    public void update(Integer id, PensionDTO dto) {
        if (!pensionRepository.existsById(id)) {
            throw new EntityNotFoundException("EPS no encontrada para actualizar.");
        }
        dto.setId(id);
        pensionRepository.save(modelMapper.map(dto, Pension.class));
    }

    @Override
    public void delete(Integer id) {
        if (!pensionRepository.existsById(id)) {
            throw new EntityNotFoundException("EPS no encontrada para eliminar.");
        }
        pensionRepository.deleteById(id);
    }

    @Override
    public List<PensionDTO> readAll() {
        List<Pension> pensions = (List<Pension>) pensionRepository.findAll();
        List<PensionDTO> auxList = pensions
                .stream()
                .map(pension -> modelMapper.map(pension, PensionDTO.class))
                .collect(Collectors.toList());

        if (auxList.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron registros de pensiones.");
        } else {
            return auxList;
        }
    }
}
