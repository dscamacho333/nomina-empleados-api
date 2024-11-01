package co.edu.unbosque.NominaEmpleadosAPI.service.interfaces;

import co.edu.unbosque.NominaEmpleadosAPI.dto.DependenciaDTO;

import java.util.List;
import java.util.Optional;

public interface IService <T,K>{

    void create(T dto);
    Optional<T> read(K id);
    void update(K id, T dto);
    void delete(K id);
    List<T> readAll();

}
