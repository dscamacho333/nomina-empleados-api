package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.PensionDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Pension;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IPensionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PensionService {

    private final ModelMapper modelMapper;
    private final IPensionRepository pensionRepository;

    public PensionService(ModelMapper modelMapper, IPensionRepository pensionRepository) {
        this.modelMapper = modelMapper;
        this.pensionRepository = pensionRepository;
    }

    public PensionDTO crearPension(PensionDTO pensionDTO) {
        try {
            Pension pension = pensionRepository.save(modelMapper.map(pensionDTO, Pension.class));
            return modelMapper.map(pension, PensionDTO.class);
        } catch (PersistenceException e) {
            throw new BadRequestException("No se pudo guardar los datos de la pension, por favor verifique los datos.");
        }
    }

    public PensionDTO buscarPensionPorId(int id) {
        return pensionRepository.findById(id)
                .map(pension -> modelMapper.map(pension, PensionDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("Pensión no encontrada."));
    }

    public List<PensionDTO> listarPensiones() {
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
