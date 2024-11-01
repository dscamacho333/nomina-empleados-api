package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.DependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.dto.EPSDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Dependencia;
import co.edu.unbosque.NominaEmpleadosAPI.entity.EPS;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEPSRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class EPSService implements IService<EPSDTO, Integer> {

    private final IEPSRepository repository;
    private final ModelMapper modelMapper;

    public EPSService(IEPSRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }


    @Override
    public void create(EPSDTO dto) {
        var eps = modelMapper.map(dto, EPS.class);
        repository.save(eps);
    }

    @Override
    public Optional<EPSDTO> read(Integer id) {
        var epsDTO = repository.findById(id).get();
        return Optional.of(modelMapper.map(epsDTO,EPSDTO.class));
    }

    @Override
    public void update(Integer id, EPSDTO dto) {
        dto.setId(id);
        var eps = modelMapper.map(dto, EPS.class);
        repository.save(eps);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<EPSDTO> readAll() {
        var epsS = (List<EPS>) repository
                .findAll();
        return epsS
                .stream()
                .map((eps) -> modelMapper.map(epsS, EPSDTO.class))
                .toList();
    }
}
