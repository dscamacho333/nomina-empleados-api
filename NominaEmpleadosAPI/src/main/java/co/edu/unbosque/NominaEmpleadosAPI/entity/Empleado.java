package co.edu.unbosque.NominaEmpleadosAPI.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "Empleado")
public class Empleado {

    @Id
    @Column(name = "id_empleado")
    private Integer id;

    @Column(name = "primer_apellido")
    private String primerApellido;

    @Column(name = "segundo_apellido")
    private String segundoApellido;

    @Column(name = "primer_nombre")
    private String primerNombre;

    @Column(name = "segundo_nombre")
    private String segundoNombre;

    @Column(name = "fecha_ingreso")
    private Date fechaIngreso;

    @ManyToOne
    @JoinColumn(name = "id_dependencia")
    private Dependencia dependencia;

    @ManyToOne
    @JoinColumn(name = "id_cargo")
    private Cargo cargo;

    @ManyToOne
    @JoinColumn(name = "id_eps")
    private EPS eps;

    @ManyToOne
    @JoinColumn(name = "id_arl")
    private ARL arl;

    @ManyToOne
    @JoinColumn(name = "id_pension")
    private Pension pension;

    @Column(name = "sueldo")
    private double sueldo;

    @OneToMany(mappedBy = "empleado")
    private List<Novedad> novedades = new ArrayList<>();
}
