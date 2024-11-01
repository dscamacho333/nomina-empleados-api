package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.ARLDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.ARL;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IARLRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ARLService implements IService<ARLDTO, Integer> {

    private final IARLRepository repository;
    private final ModelMapper modelMapper;

    public ARLService(IARLRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void create(ARLDTO dto) {
        var arl = modelMapper.map(dto, ARL.class);
        repository.save(arl);
    }

    @Override
    public Optional<ARLDTO> read(Integer id) {
        var arl = repository.findById(id).get();
        return Optional.of(modelMapper.map(arl, ARLDTO.class));
    }

    @Override
    public void update(Integer id, ARLDTO dto) {
        dto.setId(id);
        var arl = modelMapper.map(dto, ARL.class);
        repository.save(arl);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<ARLDTO> readAll() {
        var arls = (List<ARL>) repository.findAll();
        return arls.stream()
                .map(arl -> modelMapper.map(arl, ARLDTO.class))
                .toList();
    }
}
