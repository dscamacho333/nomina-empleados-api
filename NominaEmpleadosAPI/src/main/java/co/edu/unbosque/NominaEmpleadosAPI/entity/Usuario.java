package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Usuario" )
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer id;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "contrasenia")
    private String contrasenia;

    @Column(name = "esta_habilitado")
    private boolean estaHabilitado;

    @Column(name = "cuenta_no_expirada")
    private boolean cuentaNoExpirada;

    @Column(name = "cuenta_no_bloqueada")
    private boolean cuentaNoBloqueada;

    @Column(name = "credenciales_no_expiradas")
    private boolean credencialesNoExpiradas;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<RolUsuario> roles = new HashSet<>();


}
