package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.entity.Usuario;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IUsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    private final IUsuarioRepository repository;

    public UserDetailService(IUsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = repository
                .findUsuarioByUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException("User: " + username + "does not exist!"));

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        usuario
                .getRoles()
                .forEach((rol) -> authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(rol.getRol().getRolEnum().name()))));

        usuario
                .getRoles()
                .stream()
                .flatMap((rol) -> rol.getRol().getPermisos().stream())
                .forEach((permiso -> authorityList.add(new SimpleGrantedAuthority(permiso.getPermiso().getPermisoEnum().name()))));

        User user = new User(usuario.getUsuario(),
                usuario.getContrasenia(),
                usuario.isEstaHabilitado(),
                usuario.isCuentaNoExpirada(),
                usuario.isCredencialesNoExpiradas(),
                usuario.isCuentaNoBloqueada(),
                authorityList
        );

        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        user.getAuthorities().forEach(a ->System.out.println(a));

        return user;

    }
}
