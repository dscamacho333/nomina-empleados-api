package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.ARLDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.ARL;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IARLRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ARLService {

    private final ModelMapper modelMapper;
    private final IARLRepository arlRepository;

    public ARLService(ModelMapper modelMapper, IARLRepository arlRepository) {
        this.modelMapper = modelMapper;
        this.arlRepository = arlRepository;
    }

    public ARLDTO crearARL(ARLDTO arlDTO) {
        try {
            ARL arl = arlRepository.save(modelMapper.map(arlDTO, ARL.class));
            return modelMapper.map(arl, ARLDTO.class);
        } catch (PersistenceException e) {
            throw new BadRequestException("No se pudo guardar los datos de la ARL, por favor verifique los datos.");
        }
    }

    public ARLDTO buscarARLPorId(int id) {
        return arlRepository.findById(id)
                .map(arl -> modelMapper.map(arl, ARLDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("ARL no encontrada."));
    }

    public ARLDTO actualizarARL(int id, ARLDTO arlDTO) {
        if (!arlRepository.existsById(id)) {
            throw new EntityNotFoundException("ARL no encontrada para actualizar.");
        }
        arlDTO.setId(id);
        ARL arl = modelMapper.map(arlDTO, ARL.class);
        arlRepository.save(arl);
        return modelMapper.map(arl, ARLDTO.class);
    }

    public void eliminarARL(int id) {
        if (!arlRepository.existsById(id)) {
            throw new EntityNotFoundException("ARL no encontrada para eliminar.");
        }
        arlRepository.deleteById(id);
    }

    public List<ARLDTO> listarARL() {
        List<ARL> arlList = (List<ARL>) arlRepository.findAll();
        List<ARLDTO> dtoList = arlList.stream()
                .map(arl -> modelMapper.map(arl, ARLDTO.class))
                .collect(Collectors.toList());
        if (dtoList.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron registros de ARL.");
        }
        return dtoList;
    }
}
