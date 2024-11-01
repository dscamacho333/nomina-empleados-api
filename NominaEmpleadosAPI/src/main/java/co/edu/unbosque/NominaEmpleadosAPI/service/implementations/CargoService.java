package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.CargoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.dto.DependenciaDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Cargo;
import co.edu.unbosque.NominaEmpleadosAPI.repository.ICargoRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CargoService implements IService<CargoDTO, Integer> {

    private final ICargoRepository repository;
    private final ModelMapper modelMapper;

    public CargoService(ICargoRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void create(CargoDTO dto) {
        var cargo = modelMapper.map(dto, Cargo.class);
        repository.save(cargo);
    }

    @Override
    public Optional<CargoDTO> read(Integer id) {
        var cargo = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El cargo no fue encontrado!"));
        var cargoDTO = modelMapper
                .map(cargo, CargoDTO.class);
        return Optional.of(cargoDTO);
    }

    @Override
    public void update(Integer id, CargoDTO dto) {
        dto.setId(id);
        var cargo = modelMapper.map(dto, Cargo.class);
        repository.save(cargo);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<CargoDTO> readAll() {
        var cargos = (List<Cargo>) repository.findAll();
        return cargos
                .stream()
                .map((cargo) -> modelMapper.map(cargo, CargoDTO.class))
                .toList();
    }
}