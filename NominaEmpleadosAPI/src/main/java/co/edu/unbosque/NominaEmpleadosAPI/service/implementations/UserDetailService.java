package co.edu.unbosque.NominaEmpleadosAPI.service.implementations;

import co.edu.unbosque.NominaEmpleadosAPI.dto.auth.AuthLoginRequest;
import co.edu.unbosque.NominaEmpleadosAPI.dto.auth.AuthLoginResponse;
import co.edu.unbosque.NominaEmpleadosAPI.entity.Usuario;
import co.edu.unbosque.NominaEmpleadosAPI.repository.IUsuarioRepository;
import co.edu.unbosque.NominaEmpleadosAPI.utils.JwtUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    private final IUsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UserDetailService(IUsuarioRepository repository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
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
        return user;

    }

    public AuthLoginResponse login(AuthLoginRequest request){

        String usuario = request.getUsuario();
        String contrasenia = request.getContrasenia();

        Authentication autenticacion = this.autenticar(usuario, contrasenia);
        SecurityContextHolder.getContext().setAuthentication(autenticacion);
        String tokenAcceso = jwtUtils.crearToken(autenticacion);

        AuthLoginResponse response = new AuthLoginResponse(usuario, "Usuario con credenciales validas!", tokenAcceso, true);

        return response;
    }


    public Authentication autenticar(String usuario, String contrasenia){

        UserDetails userDetails = this.loadUserByUsername(usuario);

        if(userDetails == null || !passwordEncoder.matches(contrasenia, userDetails.getPassword())){
            throw  new BadCredentialsException("Usuario o contraseña invalidos!");
        }

        return new UsernamePasswordAuthenticationToken(usuario, userDetails.getPassword(), userDetails.getAuthorities());

    }


}
