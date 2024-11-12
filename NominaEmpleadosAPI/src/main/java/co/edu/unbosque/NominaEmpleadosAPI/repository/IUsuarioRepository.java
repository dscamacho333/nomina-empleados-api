package co.edu.unbosque.NominaEmpleadosAPI.repository;

import co.edu.unbosque.NominaEmpleadosAPI.entity.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUsuarioRepository extends BasicRepositoy<Usuario, Integer> {
    Optional<Usuario> findUsuarioByUsuario(String userName);

    @Query("SELECT u FROM Usuario u WHERE u.isDeleted = false")
    List<Usuario> findAllNonDeleted();

}
