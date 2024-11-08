package co.edu.unbosque.NominaEmpleadosAPI.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    @Value("${security.jwt.private.key}")
    private String llavePrivada;
    @Value("${security.jwt.user.generator}")
    private String generadorUsuario;

    public String crearToken(Authentication autenticacion){

        Algorithm algortimo = Algorithm.HMAC256(this.llavePrivada);

        String usuario = autenticacion.getPrincipal().toString();

        String autoridades = autenticacion
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String jwtToken = JWT.create()
                .withIssuer(this.generadorUsuario)
                .withSubject(usuario)
                .withClaim("authorities", autoridades)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1800000 ))
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(new Date(System.currentTimeMillis()))
                .sign(algortimo);

        return jwtToken;
    }


    public DecodedJWT validarToken(String jwtToken){
        try{

            Algorithm algortimo = Algorithm.HMAC256(this.llavePrivada);
            JWTVerifier verificador = JWT.require(algortimo)
                    .withIssuer(this.generadorUsuario)
                    .build();
            return verificador.verify(jwtToken);
        }catch(JWTVerificationException exception){
            throw new JWTVerificationException("Token invalido, no autorizado");
        }
    }

    public String extraerUsuario(DecodedJWT jwtDecodificado){
        return jwtDecodificado.getSubject();
    }

    public Claim obtenerClaimEspecifica(DecodedJWT jwtDecodificado, String nombreClaim){
        return jwtDecodificado.getClaim(nombreClaim);
    }

    public Map<String, Claim> obtenerClaims(DecodedJWT jwtDecodificado){
        return jwtDecodificado.getClaims();
    }


}
