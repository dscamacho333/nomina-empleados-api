package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.EPSDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.EPS;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IEPSRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EPSService {

    private final ModelMapper modelMapper;
    private final IEPSRepository epsRepository;

    public EPSService(ModelMapper modelMapper, IEPSRepository epsRepository) {
        this.modelMapper = modelMapper;
        this.epsRepository = epsRepository;
    }

    public EPSDTO crearEPS(EPSDTO epsDTO) {
        try {
            EPS eps = epsRepository.save(modelMapper.map(epsDTO, EPS.class));
            return modelMapper.map(eps, EPSDTO.class);
        } catch (PersistenceException e) {
            throw new BadRequestException("No se pudo guardar los datos de la EPS, por favor verifique los datos.");
        }
    }

    public EPSDTO buscarEPSPorId(int id) {
        return epsRepository.findById(id)
                .map(eps -> modelMapper.map(eps, EPSDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("EPS no encontrada."));
    }

    public EPSDTO actualizarEPS(int id, EPSDTO epsDTO) {
        if (!epsRepository.existsById(id)) {
            throw new EntityNotFoundException("EPS no encontrada para actualizar.");
        }
        epsDTO.setId(id);
        EPS eps = modelMapper.map(epsDTO, EPS.class);
        epsRepository.save(eps);
        return modelMapper.map(eps, EPSDTO.class);
    }

    public void eliminarEPS(int id) {
        if (!epsRepository.existsById(id)) {
            throw new EntityNotFoundException("EPS no encontrada para eliminar.");
        }
        epsRepository.deleteById(id);
    }

    public List<EPSDTO> listarEPS() {
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
