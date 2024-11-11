package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.CargoDTO;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Cargo;
import co.edu.unbosque.NominaEmpleadosAPI.exceptions.exceptions.BadRequestException;
import co.edu.unbosque.NominaEmpleadosAPI.repository.ICargoRepository;
import co.edu.unbosque.NominaEmpleadosAPI.service.interfaces.IService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceException;
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
        try{
            var cargo = modelMapper.map(dto, Cargo.class);
            repository.save(cargo);

        } catch(PersistenceException exception){
            throw new BadRequestException("Error al crear el cargo!");
        }
    }

    @Override
    public Optional<CargoDTO> read(Integer id) {
        var cargo = repository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("El cargo no existe!"));
        var cargoDTO = modelMapper
                .map(cargo, CargoDTO.class);
        return Optional.of(cargoDTO);
    }

    @Override
    public void update(Integer id, CargoDTO dto) {
        read(id);
        dto.setId(id);
        var cargo = modelMapper.map(dto, Cargo.class);
        repository.save(cargo);
    }

    @Override
    public void delete(Integer id) {
        var cargoDTO =  read(id).get();
        cargoDTO.setDeleted(true);
        update(id, cargoDTO);
    }

    @Override
    public List<CargoDTO> readAll() {
        var cargos = repository.findAllNonDeleted();
        return cargos
                .stream()
                .map((cargo) -> modelMapper.map(cargo, CargoDTO.class))
                .toList();
    }
}
