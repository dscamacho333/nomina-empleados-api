package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.PensionDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Pension;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IPensionRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PensionService implements IService<PensionDTO, Integer> {

    private final IPensionRepository repository;
    private final ModelMapper modelMapper;

    public PensionService(IPensionRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void create(PensionDTO dto) {
        var pension = modelMapper.map(dto, Pension.class);
        repository.save(pension);
    }

    @Override
    public Optional<PensionDTO> read(Integer id) {
        var pension = repository.findById(id).get();
        return Optional.of(modelMapper.map(pension, PensionDTO.class));
    }

    @Override
    public void update(Integer id, PensionDTO dto) {
        dto.setId(id);
        var pension = modelMapper.map(dto, Pension.class);
        repository.save(pension);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<PensionDTO> readAll() {
        var pensions = (List<Pension>) repository.findAll();
        return pensions.stream()
                .map(pension -> modelMapper.map(pension, PensionDTO.class))
                .toList();
    }
}
