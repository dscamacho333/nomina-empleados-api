package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.ARLDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.ARL;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IARLRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ARLService implements IService<ARLDTO, Integer> {

    private final ModelMapper modelMapper;
    private final IARLRepository arlRepository;

    public ARLService(ModelMapper modelMapper, IARLRepository arlRepository) {
        this.modelMapper = modelMapper;
        this.arlRepository = arlRepository;
    }

    @Override
    public void create(ARLDTO arlDTO) {
        try {
            arlRepository.save(modelMapper.map(arlDTO, ARL.class));
        } catch (PersistenceException e) {
            throw new BadRequestException("No se pudo guardar los datos de la ARL, por favor verifique los datos.");
        }
    }

    @Override
    public Optional<ARLDTO> read(Integer id) {
        return Optional.of(arlRepository.findById(id)
                .map(arl -> modelMapper.map(arl, ARLDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("ARL no encontrada.")));
    }

    public void update(Integer id, ARLDTO arlDTO) {
        if (!arlRepository.existsById(id)) {
            throw new EntityNotFoundException("ARL no encontrada para actualizar.");
        }
        arlDTO.setId(id);
        ARL arl = modelMapper.map(arlDTO, ARL.class);
        arlRepository.save(arl);
    }

    @Override
    public void delete(Integer id) {
        if (!arlRepository.existsById(id)) {
            throw new EntityNotFoundException("ARL no encontrada para eliminar.");
        }
        arlRepository.deleteById(id);
    }

    @Override
    public List<ARLDTO> readAll() {
        List<ARL> arlList = arlRepository.findAllNonDeleted();
        List<ARLDTO> dtoList = arlList.stream()
                .map(arl -> modelMapper.map(arl, ARLDTO.class))
                .collect(Collectors.toList());
        if (dtoList.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron registros de ARL.");
        }
        return dtoList;
    }
}
