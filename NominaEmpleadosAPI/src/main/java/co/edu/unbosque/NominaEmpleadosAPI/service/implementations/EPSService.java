package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EPSDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.EPS;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEPSRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EPSService implements IService<EPSDTO, Integer> {

    private final ModelMapper modelMapper;
    private final IEPSRepository epsRepository;

    public EPSService(ModelMapper modelMapper, IEPSRepository epsRepository) {
        this.modelMapper = modelMapper;
        this.epsRepository = epsRepository;
    }

    @Override
    public void create(EPSDTO epsDTO) {
        try {
            EPS eps = epsRepository.save(modelMapper.map(epsDTO, EPS.class));
        } catch (PersistenceException e) {
            throw new BadRequestException("No se pudo guardar los datos de la EPS, por favor verifique los datos.");
        }
    }

    @Override
    public Optional<EPSDTO> read(Integer id) {
        return Optional.of(epsRepository.findById(id)
                .map(eps -> modelMapper.map(eps, EPSDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("EPS no encontrada.")));
    }

    @Override
    public void update(Integer id, EPSDTO epsDTO) {
        if (!epsRepository.existsById(id)) {
            throw new EntityNotFoundException("EPS no encontrada para actualizar.");
        }
        epsDTO.setId(id);
        EPS eps = modelMapper.map(epsDTO, EPS.class);
        epsRepository.save(eps);
    }

    @Override
    public void delete(Integer id) {
        if (!epsRepository.existsById(id)) {
            throw new EntityNotFoundException("EPS no encontrada para eliminar.");
        }
        epsRepository.deleteById(id);
    }

    @Override
    public List<EPSDTO> readAll() {
        List<EPS> epsList = (List<EPS>) epsRepository.findAll();
        List<EPSDTO> dtoList = epsList.stream()
                .map(eps -> modelMapper.map(eps, EPSDTO.class))
                .collect(Collectors.toList());
        if (dtoList.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron registros de EPS.");
        }
        return dtoList;
    }
}
